import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'

const DataPost = (props) => {
    const navigate = useNavigate();
    const [data, setData] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('post가?')
        if(localStorage.getItem('publicKey') !== null){
          try {
            // if(localStorage.getItem('publicKey')){
            // 여기서 mine block
            // } else {
            // 로그인 페이지로 이동시켜버리기
            // }
              await axios.post('http://localhost:3500/block/miningBlock', {

                  data:data,
                  // count : count 이걸로 숫자넣기
                  publicKey:localStorage.getItem('publicKey')
              }
              )
              props.setPostData(props.postData + 1)
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

  return (
    <>
    <h4>Create Block</h4>
    <Form onSubmit={handleSubmit} method="post">
      {/* <input onChange={changeData} type="text" name="data" value={data}/> */}
      <Form.Control onChange={changeData} type="text" placeholder="data" value={data}/>
      <Button variant='dark' type='submit'>Click</Button>
    </Form>
  </>
  )
}

export default DataPost