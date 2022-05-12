import React from 'react'
import axios from 'axios';
import { useState } from 'react';

const Post = () => {

    const [apiTest2, setApiTest2] = useState('')

    const callApi2 = async () => {
      const response = await axios.post('http://localhost:4000/api2', {
        result : '이 값을 넘겨줌' 
      })
      console.log(response)
      setApiTest2(response.data)
    }

  return (
    <div className='serverTest'>
        <h3>POST : {apiTest2} </h3>  
        <br/>
        <button onClick={ () => callApi2() }>POST요청</button>
    </div>
  )
}

export default Post