import React from 'react'
import axios from "axios"
import { Table } from 'react-bootstrap'
import { useEffect, useState } from "react"
import { Routes , Route, useNavigate } from 'react-router-dom'
import AddressDetail from './AddressDetail'

const AddressList = () => {

    const [address, setAddress] = useState(null)

    const navigate = useNavigate();

    const getAddressFunc = async () => {
        try {
            const blocks = await axios.get('http://localhost:3500/wallet/addressAll')
            console.log('address : ', blocks.data.wallet)
            setAddress(blocks.data.wallet)

        }
        catch(error) {
            console.error(error)
        }
    }

    useEffect( () => {
        getAddressFunc()
    },[])

    const toAddressDetail = () => {
        navigate('/addressdetail')
    }

  return (
    <div>
        <h2>AddressList</h2>
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th>#</th>
                <th>Address</th>

            </tr>
            </thead>
            <tbody >
                {
                    address === null 
                    ? false 
                    :
                    address.map( (data, index) => {
                        return <tr key={index}>
                            <td>{index}</td>
                            <td className='addressDetail' onClick={toAddressDetail}>{(data.publicKey).substr(0, 15)}...{(data.publicKey).slice(-15)}</td>
                            <Routes>
                            <Route path='/addressdetail' element={<AddressDetail data={data}/>}/>
                            </Routes>
                        </tr>
                    })
                }
            </tbody>
        </Table>
    </div>
  )
}

export default AddressList