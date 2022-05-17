import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'

const AutoDataPost = (props) => {
    const navigate = useNavigate();
    const [data, setData] = useState('')
    const [count, setCount] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('post가?')
        if(localStorage.getItem('publicKey') !== null){
            try {
                for(let i=0; i < count; i++) {
                    await axios.post('http://localhost:3500/block/miningBlock', {

                        data:data,
                        //count:i,
                        publicKey:localStorage.getItem('pulicKey')

                    }
                    )
                    props.setPostData(props.postData + 1)
                }
            }
            catch (error) {
                console.log(error)
            }
        } else {
            navigate('/login')
        }
    }

    const changeData = async (e) => {
        setData(e.target.value)
    }

    const changeCount = async (e) => {
        setCount(e.target.value)
    }

  return (
    <>
    <h4>Create Auto Block</h4>
    <Form onSubmit={handleSubmit} method="post">
      <Form.Control onChange={changeData} type="text" placeholder="data" value={data}/>
      <Form.Control onChange={changeCount} type="number" value={count}/>
      <Button variant='dark' type='submit'>Click</Button>
    </Form>
  </>
  )
}

export default AutoDataPost