import React from 'react'
import axios from "axios"
import { Table, Button } from 'react-bootstrap'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'


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

    const toAddressDetail = (data) => {
        navigate('/addressdetail', { state : data })
    }

    const clickCopy = async (publicKey) => {
        await navigator.clipboard.writeText(publicKey)
        alert("주소복사 완료!")
      } 

  return (
    <div className='addressList'>
        <h2>AddressList</h2>
        <div className='addressTable'>
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
                            return <tr key={index} className='addressTableTr'>
                                <td>{index}</td>
                                <td className='addressTableTd' onClick={()=> toAddressDetail(data.publicKey)}>
                                    {(data.publicKey).substr(0, 15)}...{(data.publicKey).slice(-15)}
                                    
                                </td>
                                <td><Button variant='dark' onClick={() => clickCopy(data.publicKey)}>Copy</Button></td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </div>
    </div>
  )
}

export default AddressList