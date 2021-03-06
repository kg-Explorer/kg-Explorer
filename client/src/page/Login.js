import React, { useState } from 'react'
import axios from "axios";
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [publicKey, setPublicKey] = useState('')

    const navigate = useNavigate()

    const toCreatekey = () => {
        navigate('/createkey')
    }

    const toMainPage = () => {
        navigate('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const blocks = await axios.post('http://localhost:3500/wallet/checkAddress', {
                data : publicKey,
            })
            console.log(blocks.data);

            if(blocks.data) {
                localStorage.setItem('publicKey', publicKey)
                console.log("address check success")
                toMainPage()
            } else {
                console.log("address check fail")
                alert("Please check your address")
            }
        }
        catch (error) {
            console.log(error)
            alert("Public Key를 확인해주세요")
        }
    }

    const changePublicKey = async(e) => {
        setPublicKey(e.target.value)
        console.log(publicKey)
    }
    // const removeLocalStorage = () => {
    //     localStorage.removeItem("publicKey");
    //     console.log(localStorage.getItem('publicKey'))
    // }

  return (
    <div className='login'>
        <div className='loginMain'> 
            <Form onSubmit={handleSubmit} method='post'>
            <h4>Welcome Explorer</h4>
            <p>login to your wallet key</p>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Wallet Key</Form.Label>
                <Form.Control onChange={changePublicKey} type="text" placeholder="public key" value={publicKey}/>
            </Form.Group>
            <div className='loginButton'>
                <Button variant='dark' onClick={()=>toCreatekey()}> Create Key</Button>
                <Button variant='dark' type='submit'>Login</Button>
            </div>
            </Form>
        </div>
    </div>
  )
}

export default Login