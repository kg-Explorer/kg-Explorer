import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { TestButton, TestMain, TestTest } from './components';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'



function App() {

  const [test, setState] = useState('');
  const navigate = useNavigate();

  const [apiTest, setApiTest] = useState('')
  const [apiTest2, setApiTest2] = useState('')

  const click = () => {
    setState('DB데이터가 짠')
  }

  const callApi = async () => {
    const response = await axios.get('http://localhost:4000/api')
      setApiTest(response.data.test)
      //setTest('qwerweq')
      //console.log(test)
     
  }

  console.log(test)

  const callApi2 = async () => {
    const response = await axios.post('http://localhost:4000/api2', {
      result : '이 값을 넘겨줌' 
    })
    console.log(response)
    setApiTest2(response.data)
  }

  return (
    <div className="App">

      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/">Here is Explorer!!</Navbar.Brand>
        <Nav className="me-auto">
          {/* <Nav.Link>Home</Nav.Link>
          <Nav.Link>Test</Nav.Link> */}
          <Nav.Link onClick={() => { navigate('/')}}>Home</Nav.Link>
          <Nav.Link onClick={() => { navigate('/test')}}>Test</Nav.Link>
        </Nav>
        </Container>
      </Navbar>

          
      <div className='serverTest'>
        <h3>GET : {apiTest} </h3>
        <br/>  
        <h3>POST : {apiTest2} </h3>  
        <br/>
        <button onClick={ () => callApi() }>GET요청</button>
        <button onClick={ () => callApi2() }>POST요청</button>
      </div>

      {/* Route stage */}
      <Routes>
        <Route path="/" element={ 
          <TestMain test={test} click={click}/>
        }/>
        <Route path="/test" element={ 
          <TestTest test={test} click={click}/>
        } />
      </Routes>
    </div>
  );
}

export default App;
