import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

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
    <h2>거래를 해볼까나??</h2>
    <form onSubmit={handleSubmit} method="post">
      {/* <input onChange={changeTxFrom} type="text" name="txFrom" value={txFrom}/> */}
      <input onChange={changeTxTo} type="text" name="txTo" value={txTo}/>
      <input onChange={changeAmount} type="number" name='amount' value={amount} />
      <input type="submit" value="거래고래거래" />
    </form>
  </>
  )
}

export default Transaction;