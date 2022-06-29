import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router";
import { Form, InputGroup, FormControl, Button, Table } from 'react-bootstrap'
import { Transaction } from '../components';

const AddressDetail = () => {
  

  const { state } = useLocation();
  console.log(state);
  const [txData, setTxData] = useState(null)
  const [blockData, setBlockData] = useState(null)
  
  const searchPublicKey = async (e) => {
    e.preventDefault()
    console.log('들어와?')
    try {
        const blocks = await axios.post('http://localhost:3500/transaction/txRead', {
            data:state,
            
          }
          )

          console.log(blocks)
          console.log("txData : ", blocks.data.txData)
          console.log("blockData : ", blocks.data.blockData)
          setTxData(blocks.data.txData)
          setBlockData(blocks.data.blockData.reverse())
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
          <h5># Address Data</h5>
          <Table striped bordered hover size="sm">
              <thead>
              <tr>
                  <th>TxNum</th>
                  <th>TxAmount</th>
                  <th>TxFrom</th>
                  <th>TxTime</th>
                  <th>TxTo</th>
              </tr>
              </thead>
              <tbody>
                  {
                    txData === null 
                    ? false 
                    :
                    txData.map( (data, index) => {
                        return <tr key={index}>
                            <td>{index}</td>
                            <td>{data.txAmount}</td>
                            <td>{(data.txFrom).substr(0,10)}...{(data.txFrom).slice(-10)}</td>
                            <td>{data.txTime}</td>
                            <td>{(data.txTo).substr(0,10)}...{(data.txTo).slice(-10)}</td>
                        </tr>
                    })
                  }
                </tbody>
            </Table>
        </div>

        <div className='box2'>
          <h5># Block Data</h5>
            <Table striped bordered hover size="sm">
              <thead>
              <tr>
                  <th>BlockIndex</th>
                  <th>Data</th>
                  <th>Hash</th>
              </tr>
              </thead>
              <tbody>
                {
                    blockData === null 
                    ? false 
                    :
                    blockData.map( (data, index) => {
                        return <tr key={index}>
                            <td>{data.blockIndex}</td>
                            <td>{data.data}</td>
                            <td>{data.hash}</td>
                        </tr>
                    })
                }
              </tbody>
          </Table>              
        </div>
      </div>
    </div>
  )
}

export default AddressDetail