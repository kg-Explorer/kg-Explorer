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
  const [test, setTest] = useState(null)
  
  const searchPublicKey = async (e) => {
    e.preventDefault()
    console.log('들어와?')
    try {
        const blocks = await axios.post('http://localhost:3500/transaction/txRead', {
            data:state,
            
            //publicKey:localStorage.getItem('publicKey')
          }
          )
          //const blockData = [blocks]
          console.log(blocks)
          console.log(blocks.data)
          console.log(blocks.data[0].txAmount)
          // console.log(blockData)
          setTest(blocks.data)
        //setPostData(postData + 1)
    }
    catch (error) {
        console.log(error)
    }
  }

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
      
      <div className='middleBoxCotainer'>
        <div className='middle'>11</div>
        <div className='middle'>22</div>
        <div className='middle'>33</div>
      </div>
      <div className='boxContainer'>
        <div className='box1'>
          {
            test === null
            ? false
            :
            <div>
              <h4> txAmount : {test[0].txAmount} </h4>
              <h4> txFrom : {(test[0].txFrom).substr(0,10)}...{(test[0].txFrom).slice(-10)}</h4>
              <h4> txTime : {test[0].txTime} </h4>
              <h4> txTo : {(test[0].txTo).substr(0,10)}...{(test[0].txTo).slice(-10)} </h4>
            </div>
          }
        </div>
        <div className='box2'>
            box2
        </div>
      </div>
    </div>
  )
}

export default AddressDetail