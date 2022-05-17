import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

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
              const blocks = await axios.post('http://localhost:3500/block/miningBlock', {

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
    <h2>블록 만들기!!!</h2>
    <form onSubmit={handleSubmit} method="post">
      <input onChange={changeData} type="text" name="data" value={data}/>
      <input type="submit" value="블록 만들어와" />
    </form>
  </>
  )
}

export default DataPost