import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'


const Transaction = () => {
    const navigate = useNavigate();
    // const [txFrom, setTxFrom] = useState('')
    const [txTo, setTxTo] = useState('')
    const [amount, setAmount] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if( localStorage.getItem('publicKey') !== null ) {
           try {
                    const txSend = await axios.post('http://localhost:3500/transaction/txSend', {
                    
                    // 보내사람 주소 
                    txFrom: localStorage.getItem('publicKey'),
                    // 받는사람 주소
                    txTo:txTo,
                    // 금액
                    amount:amount
                })
                console.log(txSend.data);
                if(txSend.data === "errorAddress") {
                    alert("보낼 주소를 확인해주세요")
                } else if(txSend.data === "errorBalance") {
                    alert("잔액이 부족합니다")
                } else {
                    alert("트랜잭션 성공")
                }
            }
            catch (error) {
                console.log(error)
            } 
        } else {
            navigate('/login')
        }
        
    }

    // const changeTxFrom = async (e) => {
    //     setTxFrom(e.target.value)
    // }

    const changeTxTo = async (e) => {
        setTxTo(e.target.value)
    }

    const changeAmount = async (e) => {
        setAmount(e.target.value)
    }

  return (
    <>
    <h5># Make Transaction</h5>
    <Form onSubmit={handleSubmit} method="post">
      {/* <input onChange={changeTxFrom} type="text" name="txFrom" value={txFrom}/> */}
      <Form.Control onChange={changeTxTo} type="text" name="txTo" placeholder='To Address' value={txTo}/>
      <Form.Control onChange={changeAmount} type="number" name='amount' value={amount} />
      <Button variant='dark' type="submit">Transaction</Button>
    </Form>
  </>
  )
}

export default Transaction;