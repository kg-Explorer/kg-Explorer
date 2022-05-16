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


    const handleClick =  async () => {
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
            <p>{index}</p>
            <p>{data}</p>
            <p>{timestamp}</p>
            <p>{hash}</p>
            <p>{previousHash}</p>
            <p>{difficulty}</p>
            <p>{nonce}</p>
            <input type="submit" onClick={handleClick} value="블록 가져와"/>
        </>
    )
}

export default Main;