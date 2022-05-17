import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router";
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { Transaction } from '../components';

const AddressDetail = () => {
  

  const { state } = useLocation();
  console.log(state);
  const [test, setTest] = useState(null)
  
  const searchPublicKey = async (e) => {
    e.preventDefault()
    console.log('들어와?')
    try {
        const blocks = await axios.post('http://localhost:3500/transaction/txRead', {
            data:state,
            
          }
          )

          console.log(blocks)
          console.log(blocks.data.txData)
          setTest(blocks.data.txData)
    }
    catch (error) {
        console.log(error)
    }
  }

  return (
    <div className='detailContainer'>
      <div className='detailInput'>
        <h5> # Search Address Data</h5>
        <Form onSubmit={searchPublicKey}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              defaultValue={state}
            />
            <Button variant='dark' type='submit'> Search </Button>
          </InputGroup>
        </Form>
      <Transaction/>
      </div>
      

      <div className='detailBoxContainer'>
        <div className='box1'>
          {
            test === null
            ? false
            :
            <div>
              <h6> txAmount : {test[0].txAmount} </h6>
              <h6> txFrom : {(test[0].txFrom).substr(0,10)}...{(test[0].txFrom).slice(-10)}</h6>
              <h6> txTime : {test[0].txTime} </h6>
              <h6> txTo : {(test[0].txTo).substr(0,10)}...{(test[0].txTo).slice(-10)} </h6>
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