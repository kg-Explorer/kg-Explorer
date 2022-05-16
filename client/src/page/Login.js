import React from 'react'
import { Form } from 'react-bootstrap'

const Login = () => {
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
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <div className='loginButton'>
            <button>Create Key</button>
            <button>Login</button>
        </div>
        </Form>
    </div>
    
  )
}

export default Login