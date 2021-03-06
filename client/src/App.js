import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components';
import { Main, Login, CreateKey, AddressList, AddressDetail } from './page'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className='App'>

      <Header />
          
      {/* Route stage */}
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/createkey' element={<CreateKey/>} />
        <Route path='/addresslist' element={<AddressList/>} />
        <Route path='/addressdetail' element={<AddressDetail/>} />
      </Routes>

    </div>
  );
}

export default App;
