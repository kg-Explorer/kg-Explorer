import React, {useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const CreateKey = () => {

    const [publicKey , setPublicKey] = useState('')
    const navigate = useNavigate();

    const createKey = async() => {

        try {
            const blocks = await axios.get('http://localhost:3500/wallet/createAddress')
            //alert("Success Create Key!!")
            console.log("클릭확인")
            console.log(blocks.data.publicKey)
            setPublicKey(blocks.data.publicKey)
            
            //alert("알람뜨면서 useNavigate를 하면되겠지?")
            //return blocks
        }
        catch (error) {
            console.log(error)
        }
    }

    const toLoginPage = () => {
        navigate('/login')
    }


  return (
    <div>
        <h4>Are you sure create public key?</h4>
        <p>Press Button !!</p>
        <button onClick={()=>{createKey()}}>Create key</button>
        <p>==================</p>
        <h4>Your Publickey Is..</h4>
        <p>{publicKey}</p>
        <button onClick={toLoginPage}>Go to Login!</button>
    </div>
  )
}

export default CreateKey