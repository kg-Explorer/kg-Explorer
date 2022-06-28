const CryptoJS = require("crypto-js");
const pool = require("../../db.js");

const BLOCK_GENERATOIN_INTERVAL = 10;
const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;

class Block {
  constructor(
    blockIndex,
    data,
    timestamp,
    hash,
    previousHash,
    difficulty,
    nonce
  ) {
    this.blockIndex = blockIndex;
    this.data = data;
    this.timestamp = timestamp;
    this.hash = hash;
    this.previousHash = previousHash;
    this.difficulty = difficulty;
    this.nonce = nonce;
  }
}

const calculateHash = (
  blockIndex,
  data,
  timestamp,
  previousHash,
  difficulty,
  nonce
) => {
  return CryptoJS.SHA256(
    `${blockIndex + data + timestamp + previousHash + difficulty + nonce}`
  ).toString();
};

const createGenesisBlock = () => {
  const genesisBlock = new Block(
    0,
    "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks",
    1652259600,
    0,
    0,
    1,
    0
  );

  genesisBlock.hash = calculateHash(
    genesisBlock.blockIndex,
    genesisBlock.data,
    genesisBlock.timestamp,
    genesisBlock.previousHash,
    genesisBlock.difficulty,
    genesisBlock.nonce
  );

  return genesisBlock;
};

const getBlocks = () => {
  return blocks;
};

const getLatestBlock = () => {
  return blocks[blocks.length - 1];
};

const createBlock = (blockData) => {
  const previousBlock = blocks[blocks.length - 1];
  console.log(previousBlock);
  const nextIndex = previousBlock.blockIndex + 1;
  const nextTimestamp = new Date().getTime() / 1000;
  const nextDifficulty = getDifficulty();
  const nextNonce = findNonce(
    nextIndex,
    blockData,
    nextTimestamp,
    previousBlock.hash,
    nextDifficulty
  );

  const nextHash = calculateHash(
    nextIndex,
    blockData,
    nextTimestamp,
    previousBlock.hash,
    nextDifficulty,
    nextNonce
  );

  const newBlock = new Block(
    nextIndex,
    blockData,
    nextTimestamp,
    nextHash,
    previousBlock.hash,
    nextDifficulty,
    nextNonce
  );

  return newBlock;
};

const addBlock = (newBlock, previousBlock) => {
  if (isValidNewBlock(newBlock, previousBlock)) {
    blocks.push(newBlock);
    return true;
  }
  return false;
};

const mineBlock = async (blockData, publicKey) => {
  const newBlock = createBlock(blockData);
  if (addBlock(newBlock, getLatestBlock())) {
    console.log("mineBlock : " + publicKey);
    try {
      await pool.query(
        `INSERT INTO blocks(blockIndex, data, timestamp, hash, previousHash, difficulty, nonce, miner) VALUES(${newBlock.blockIndex},'${blockData}', '${newBlock.timestamp}', '${newBlock.hash}','${newBlock.previousHash}',${newBlock.difficulty}, ${newBlock.nonce}, '${publicKey}')`
      );
      await pool.query(
        `UPDATE wallet SET walletAmount = walletAmount + 10 WHERE publicKey='${publicKey}'`
      );
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("문제 발생하여 블록 생성 실패");
  }
};

let autoMining;
const autoMineBlock = async (blockData, publicKey, count) => {
  autoMining = 0;
  while (autoMining < count) {
    await mineBlock(blockData, publicKey);
    autoMining++;
  }
  return true;
};

const isValidBlockStructure = (newBlock) => {
  if (
    typeof newBlock.blockIndex === "number" &&
    typeof newBlock.data === "string" &&
    typeof newBlock.timestamp === "number" &&
    typeof newBlock.hash === "string" &&
    typeof newBlock.previousHash === "string" &&
    typeof newBlock.difficulty === "number" &&
    typeof newBlock.nonce === "number"
  ) {
    return true;
  }

  return false;
};
const isValidNewBlock = (newBlock, previousBlock) => {
  if (newBlock.blockIndex !== previousBlock.blockIndex + 1) {
    console.log(newBlock.blockIndex + " && " + previousBlock.blockIndex);
    console.log("invalid blockIndex");
    return false;
  } else if (newBlock.previousHash !== previousBlock.hash) {
    console.log("invalid previousHash");
    return false;
  } else if (!isValidBlockStructure(newBlock)) {
    console.log("invalid block structure");
    return false;
  }

  return true;
};

const hashMatchDifficulty = (hash, difficulty) => {
  const binaryHash = hexToBinary(hash);
  const requiredPrefix = "0".repeat(difficulty);
  return binaryHash.startsWith(requiredPrefix);
};

const hexToBinary = (hex) => {
  const lookupTable = {
    0: "0000",
    1: "0001",
    2: "0010",
    3: "0011",
    4: "0100",
    5: "0101",
    6: "0110",
    7: "0111",
    8: "1000",
    9: "1001",
    a: "1010",
    b: "1011",
    c: "1100",
    d: "1101",
    e: "1110",
    f: "1111",
  };

  let binary = "";
  for (let i = 0; i < hex.length; i++) {
    if (lookupTable[hex[i]]) {
      binary += lookupTable[hex[i]];
    } else {
      console.log("invalid hex : ", hex);
      return null;
    }
  }

  return binary;
};

const findNonce = (blockIndex, data, timestamp, previousHash, difficulty) => {
  let nonce = 0;

  while (true) {
    let hash = calculateHash(
      blockIndex,
      data,
      timestamp,
      previousHash,
      difficulty,
      nonce
    );

    if (hashMatchDifficulty(hash, difficulty)) {
      return nonce;
    } else {
      nonce++;
    }
  }
};

const difficultyChangeLog = [];
class Log {
  constructor(idx, expect, elapsed, how, result) {
    this.idx = idx;
    this.expect = expect;
    this.elapsed = elapsed;
    this.how = how;
    this.result = result;
  }
}

const getAdjustmentDifficulty = () => {
  const prevAdjustedBlock =
    blocks[blocks.length - 1 - DIFFICULTY_ADJUSTMENT_INTERVAL];
  const latestBlock = getLatestBlock();
  const elapsedTime = latestBlock.timestamp - prevAdjustedBlock.timestamp;
  const expectedTime =
    DIFFICULTY_ADJUSTMENT_INTERVAL * BLOCK_GENERATOIN_INTERVAL;
  let idx = prevAdjustedBlock.blockIndex;

  if (latestBlock.difficulty > 5) {
    if (elapsedTime > expectedTime * 2) {
      const newLog = new Log(
        idx,
        expectedTime,
        elapsedTime,
        "낮추기",
        latestBlock.difficulty - 1
      );
      difficultyChangeLog.push(newLog);
      return latestBlock.difficulty - 1;
    } else if (elapsedTime < expectedTime / 2) {
      const newLog = new Log(
        idx,
        expectedTime,
        elapsedTime,
        "높이기",
        latestBlock.difficulty + 1
      );
      difficultyChangeLog.push(newLog);
      return latestBlock.difficulty + 1;
    } else {
      const newLog = new Log(
        idx,
        expectedTime,
        elapsedTime,
        "고정",
        latestBlock.difficulty
      );
      difficultyChangeLog.push(newLog);
      return latestBlock.difficulty;
    }
  } else {
    return latestBlock.difficulty + 1;
  }
};

const getDifficulty = () => {
  const latestBlock = getLatestBlock();

  if (
    latestBlock.blockIndex % DIFFICULTY_ADJUSTMENT_INTERVAL === 0 &&
    latestBlock.blockIndex !== 0
  ) {
    return getAdjustmentDifficulty();
  }

  return latestBlock.difficulty;
};

const getDifficultyLog = () => {
  return difficultyChangeLog;
};

let blocks = [];

// const dbBlocks = async () => {
//   let [dbBlocks] = await pool.query(`SELECT * FROM blocks`);
//   console.log("read : " + dbBlocks[0].data);
//   for (let i = 0; i < dbBlocks.length; i++) {
//     blocks[i] = dbBlocks[i];
//   }
//   console.log(blocks.length);
// };
// dbBlocks();

// console.log("blocks array : " + blocks);

module.exports = {
  getBlocks,
  mineBlock,
  autoMineBlock,
  getLatestBlock,
  getDifficultyLog,
};
