import React from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

    const toCreatekey = () => {
        navigate('/createkey')
    }

  return (
    <div className='loginMain'> 
        {/* <div className='loginBox'>
            <div className='loginHead'> 
                <h4>Welcome Explorer</h4>
                <p>login to your wallet key</p>
            </div>
            <div className='loginInput'> 
                <p>Wallet Key</p>
                <input placeholder="key" />
            </div>
            <div className='loginSubmit'> 
                <button>Login</button>
            </div>
        </div> */}

        <Form>
        <h4>Welcome Explorer</h4>
        <p>login to your wallet key</p>
        <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Wallet Key</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <div className='loginButton'>
            <button onClick={()=>toCreatekey()}> Create Key</button>
            <button>Login</button>
        </div>
        </Form>
    </div>
    
  )
}

export default Login