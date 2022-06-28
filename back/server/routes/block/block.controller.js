const {
  getBlocks,
  mineBlock,
  autoMineBlock,
  getLatestBlock,
  getDifficultyLog,
} = require("./blockchain");
const pool = require("../../db.js");

const getblock = async (req, res) => {
  const [blocks] = await pool.query(`SELECT * FROM blocks`);
  console.log("blocks : ", blocks);

  res.json(blocks);
};

const createBlock = async (req, res) => {
  const { blockIndex, data, timestamp, hash, previousHash, difficulty, nonce } =
    req.body;
  const [blocks] = await pool.query(
    `INSERT INTO blocks(blockIndex, data, timestamp, hash, previousHash, difficulty, nonce) VALUES(${blockIndex},'${data}', '${timestamp}','${hash}','${previousHash}',${difficulty},${nonce})`
  );
  console.log(blocks);
  res.json(blocks);
};

const blocks = (req, res) => {
  res.send(getBlocks());
};

const latestBlock = (req, res) => {
  res.send(getLatestBlock());
};

const miningBlock = (req, res) => {
  res.send(mineBlock(req.body.data, req.body.publicKey));
};

const autoMiningBlock = (req, res) => {
  // res.send(autoMineBlock(req.body.data, req.body.publicKey, req.body.count));
  if (autoMineBlock(req.body.data, req.body.publicKey, req.body.count)) {
    res.send("success");
  }
};

const log = (req, res) => {
  res.send(getDifficultyLog());
};

module.exports = {
  getblock,
  createBlock,
  blocks,
  latestBlock,
  miningBlock,
  autoMiningBlock,
  log,
};
