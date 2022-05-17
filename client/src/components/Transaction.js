import React from 'react'
import axios from "axios";
import { useState } from "react";


const Transaction = (props) => {
    const [data, setData] = useState('')
    const [count, setCount] = useState(0)
    const [amount, setAmount] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            console.log('handleSubmit 이거 되냐??')
            for(let i=0; i < count; i++) {
                const blocks = await axios.post('http://localhost:3500/transaction/txRead', {

                    data:data,
                    publicKey:localStorage.getItem('pulicKey')

                }
                )
                props.setPostData(props.postData + 1)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const changeData = async (e) => {
        setData(e.target.value)
    }

    const changeCount = async (e) => {
        setCount(e.target.value)
    }

    const changeAmount = async (e) => {
        setAmount(e.target.value)
    }

  return (
    <>
    <h2>거래를 해볼까나??</h2>
    <form onSubmit={handleSubmit} method="post">
      <input onChange={changeData} type="text" name="data" value={data}/>
      <input onChange={changeCount} type="number" name="count" value={count}/>
      <input onChange={changeAmount} type="number" name='amount' value={amount} />
      <input type="submit" value="거래고래거래" />
    </form>
  </>
  )
}

export default Transaction;