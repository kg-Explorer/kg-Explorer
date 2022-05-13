import axios from "axios";
import { useState } from "react";

const Post = () => {
    const [blockIndex, setBlockIndex] = useState(0)
    const [data, setData] = useState('')
    const [timestamp, setTimestamp] = useState(0)
    const [hash, setHash] = useState('')
    const [previousHash, setPreviousHash] = useState('')
    const [difficulty, setDifficulty] = useState(0)
    const [nonce, setNonce] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('post가?')
        try {
            const blocks = await axios.post('http://localhost:3500/block/createBlock', {
                blockIndex:blockIndex,
                data:data,
                hash:hash,
                previousHash:previousHash,
                difficulty:difficulty,
                nonce:nonce
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    const changeBlockIndex = async (e) => {
        setBlockIndex(e.target.value)
    }
    const changeData = async (e) => {
        setData(e.target.value)
    }
    const changeTimestamp = async (e) => {
        setTimestamp(e.target.value)

    }
    const changeHash = async (e) => {
        setHash(e.target.value)
    }
    const changePreviousHash = async (e) => {

        setPreviousHash(e.target.value)
    }
    const changeDifficulty = async (e) => {
        setDifficulty(e.target.value)
    }
    const changeNonce = async (e) => {
        setNonce(e.target.value)

    }
    


  return (
    <>
      <h2>블록 만들기!!!</h2>
      <form onSubmit={handleSubmit} method="post">
        <input onChange={changeBlockIndex} type="number" name="index" value={blockIndex} />
        <input onChange={changeData} type="text" name="data" value={data}/>
        <input onChange={changeTimestamp} name="timestamp" value={timestamp} />
        <input onChange={changeHash} type="text" name="hash" value={hash}/>
        <input onChange={changePreviousHash} type="text" name="previousHash" value={previousHash}/>
        <input onChange={changeDifficulty} type="number" name="difficulty" value={difficulty}/>
        <input onChange={changeNonce} type="number" name="nonce" value={nonce}/>
        <input type="submit" value="블록 만들어와" />
      </form>
    </>
  );
};

export default Post;
