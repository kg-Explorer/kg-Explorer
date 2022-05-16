import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"

const AddressList = () => {

    const getAddressFunc = async () => {
        try {
            const blocks = await axios.get('http://localhost:3500/wallet/addressAll')
            console.log('blocks : ', blocks)

        }
        catch(error) {
            console.error(error)
        }
    }

    useEffect( () => {
        getAddressFunc()
    },[])


  return (
    <div>
        <h2>AddressList</h2>
        <p>asdf</p>
    </div>
  )
}

export default AddressList