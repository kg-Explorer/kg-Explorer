import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { faWallet, faGlobeEurope, faList, faAddressCard, faCube } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {

    const navigate = useNavigate();
    const logOutHandler = () => {
        localStorage.removeItem("publicKey");
        console.log(localStorage.getItem('publicKey'))
        window.location.reload();
    }

    return (
    <div className='navBar'>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/"><FontAwesomeIcon icon={faGlobeEurope} /> Explorer </Navbar.Brand>
                
                <Nav className="me-auto">
                    <Nav.Link onClick={() => { navigate('/')}}><FontAwesomeIcon icon={faCube}/> Blocks</Nav.Link>
                    <Nav.Link onClick={() => { navigate('/addresslist')}}><FontAwesomeIcon icon={faAddressCard}/> AddressList</Nav.Link>
                    <Nav.Link onClick={() => { navigate('/addressdetail')}}><FontAwesomeIcon icon={faList}/> Datas & Txs</Nav.Link>
                    {/* <Nav.Link onClick={() => { navigate('/addressdetail')}}>AddressDetail</Nav.Link> */}
                    {/*<div className='wallet'> <Nav.Link onClick={() => { navigate('/login')}}><FontAwesomeIcon icon={faWallet} /> Login</Nav.Link></div> */}
                    { localStorage.getItem("publicKey") === null ? 
                        <div className='wallet'><Nav.Link onClick={() => { navigate('/login')}}><FontAwesomeIcon icon={faWallet} /> Login</Nav.Link></div> : 
                        <div className='wallet'><Nav.Link onClick={logOutHandler}><FontAwesomeIcon icon={faWallet} /> LogOut </Nav.Link></div>
                    }
                    
                </Nav>
            </Container>
        </Navbar>
    </div>
    )
    }

export default Header