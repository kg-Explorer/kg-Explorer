import React, {useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const CreateKey = () => {

    const [publicKey , setPublicKey] = useState('')
    const navigate = useNavigate();

    const createKey = async() => {

        try {
            const blocks = await axios.get('http://localhost:3500/wallet/createAddress')

            console.log("클릭확인")
            console.log(blocks.data.publicKey)
            setPublicKey(blocks.data.publicKey)
            
        }
        catch (error) {
            console.log(error)
        }
    }

    const toLoginPage = () => {
        navigate('/login')
    }

    const clickCopy = async () => {
        await navigator.clipboard.writeText(publicKey)
        alert("주소복사 완료! 로그인 페이지로 이동합니다!")
        toLoginPage()
      } 

  return (

    <div className='login'>
        <div className='loginMain'> 
            <Form>
                <h4>Are you sure create public key?</h4>
                <p>Press Button !!</p>
                <Button variant='dark' onClick={()=>{createKey()}} >Create Key</Button>
            <div className='loginKey'>
            <h4>Your Publickey Is..</h4>
                <p>{publicKey.substr(0,15)} ... {publicKey.slice(-15)}</p>
                <Button variant='dark' onClick={() => clickCopy()}>Copy</Button>
            </div>
            </Form>
        </div>
    </div>

  )
}

export default CreateKey