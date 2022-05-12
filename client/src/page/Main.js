import React from 'react'
import axios from 'axios';
import { useState } from 'react';

const Main = () => {

    const [apiTest, setApiTest] = useState('')

    const callApi = async () => {
        const response = await axios.get('http://localhost:4000/api')
          setApiTest(response.data.test)
          //setTest('qwerweq')
          //console.log(test)
         
      }

  return (
      
    <div className='serverTest'>
        <h3>GET : {apiTest} </h3>
        <br/>  
        <button onClick={ () => callApi() }>GET요청</button>
    </div>
    
  )
}

export default Main