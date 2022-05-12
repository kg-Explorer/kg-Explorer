import axios from "axios"
import { useState } from "react"

const Main = () => {
    const [index, setIndex] = useState(0)
    const [data, setData] = useState('')
    const [timestamp, setTimestamp] = useState(0)
    const [hash, setHash] = useState('')
    const [previousHash, setPreviousHash] = useState('')
    const [difficulty, setDifficulty] = useState(0)
    const [nonce, secNonce] = useState(0)


    const handleClick =  async (e) => {
        console.log('이거 가냐?')
        try {
            const blocks = await axios.get('http://localhost:3500/block/getblock')
            console.log('blocks : ', blocks)
            setIndex(blocks.data.index)
            setData(blocks.data.data)
            setTimestamp(blocks.data.timestamp)
            setHash(blocks.data.hash)
            setPreviousHash(blocks.data.previousHash)
            setDifficulty(blocks.data.difficulty)
            secNonce(blocks.data.nonce)
            

        }
        catch(error) {
            console.error(error)
        }
    }

    return (
        <>
            <h2>블록 가져오기!!!</h2>
            <input type="text" name="index" value={index} />
            <input type="text" name="data" value={data}/>
            <input type="text" name="timestamp" value={timestamp}/>
            <input type="text" name="hash" value={hash}/>
            <input type="text" name="previousHash" value={previousHash}/>
            <input type="text" name="difficulty" value={difficulty}/>
            <input type="text" name="nonce" value={nonce}/>
            <input type="submit" onClick={handleClick} value="블록 가져와"/>

        </>
    )
}

export default Main;