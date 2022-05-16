import React from 'react'
import axios from "axios"

const CreateKey = () => {


    const createKey = async() => {

        try {
            const blocks = await axios.get('http://localhost:3500/wallet/createAddress')
            //alert("Success Create Key!!")
            console.log("클릭확인")
            console.log(blocks.data.publicKey)
            //alert("알람뜨면서 useNavigate를 하면되겠지?")
            //return blocks
        }
        catch (error) {
            console.log(error)
        }
    }


  return (
    <div>
        <h4>Are you sure create public key?</h4>
        <p>Press Button !!</p>
        <button onClick={()=>{createKey()}}>Create key</button>
    </div>
  )
}

export default CreateKey