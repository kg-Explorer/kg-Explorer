import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {

    const navigate = useNavigate();

    return (
    <div className='navBar'>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Here is Explorer!!</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => { navigate('/')}}>Main</Nav.Link>
                    <Nav.Link onClick={() => { navigate('/post')}}>Post</Nav.Link>
                    <Nav.Link onClick={() => { navigate('/test')}}>Test</Nav.Link>
                </Nav>
            </Container>
        </Navbar>

    </div>
    )
    }

export default Header