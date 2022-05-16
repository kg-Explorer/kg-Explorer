import React from 'react'
import axios from "axios";
import { useState } from "react";


const AutoDataPost = (props) => {
    const [data, setData] = useState('')
    const [count, setCount] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('post가?')
        try {
            for(let i=0; i < count; i++) {
                const blocks = await axios.post('http://localhost:3500/block/miningBlock', {

                    data:data,
                    //count:i,

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

  return (
    <>
    <h2>자동 블록 만들기!!!</h2>
    <form onSubmit={handleSubmit} method="post">
      <input onChange={changeData} type="text" name="data" value={data}/>
      <input onChange={changeCount} type="number" name="count" value={count}/>
      <input type="submit" value="블록 만들어와" />
    </form>
  </>
  )
}

export default AutoDataPost