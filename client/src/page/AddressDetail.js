import React, { useEffect } from 'react'
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router";
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'

const AddressDetail = () => {

  const { state } = useLocation();
  console.log(state);
  //const [publicKey , setPublickey] = useState('')
  const [postData, setPostData] = useState(0)
  const [test, setTest] = useState('')
  
  const searchPublicKey = async () => {
    try {
        const blocks = await axios.post('http://localhost:3500/transaction/txRead', {
            data:state,
            
            //publicKey:localStorage.getItem('publicKey')
        }
        )
        console.log(blocks)
        setTest(blocks)
        setPostData(postData + 1)
    }
    catch (error) {
        console.log(error)
    }
  }

  // const changeKey = () => {
  //   setPublickey(state)
  // }

  // const readTxData = async () => {
  //     try {
  //       const blocks = await axios.get('http://localhost:3500/transaction/txView') 


  //   }
  //   catch (error) {
  //       console.log(error)
  //   }
  // }

  useEffect( () => {
    //changeKey()
    console.log(test)
  },[test])

  return (
    <div className='testContainer'>
      <div className='input'>
        <Form onSubmit={searchPublicKey}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              defaultValue={state}
            />
            <Button type='submit'> Search </Button>
          </InputGroup>
        </Form>
      </div>
      {test}
      <div className='middleBoxCotainer'>
        <div className='middle'>11</div>
        <div className='middle'>22</div>
        <div className='middle'>33</div>
      </div>
      <div className='boxContainer'>
        <div className='box1'>
            box1
        </div>
        <div className='box2'>
            box2
        </div>
      </div>
    </div>
  )
}

export default AddressDetail