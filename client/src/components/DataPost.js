import React from 'react'
import axios from "axios";
import { useState } from "react";

const DataPost = () => {

    const [data, setData] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('post가?')
        try {
            const blocks = await axios.post('http://localhost:3500/block/miningBlock', {

                data:data,

            })
        }
        catch (error) {
            console.log(error)
        }
    }

    const changeData = async (e) => {
        setData(e.target.value)
    }

  return (
    <>
    <h2>블록 만들기!!!</h2>
    <form onSubmit={handleSubmit} method="post">
      <input onChange={changeData} type="text" name="data" value={data}/>
      <input type="submit" value="블록 만들어와" />
    </form>
  </>
  )
}

export default DataPost