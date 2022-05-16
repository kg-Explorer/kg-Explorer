import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components';
import { Main, MyPage, Test, Login, CreateKey, AddressList } from './page'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div>

      <Header />
          
      {/* Route stage */}
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/mypage' element={<MyPage/>} />
        <Route path='/test' element={<Test/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/createkey' element={<CreateKey/>} />
        <Route path='/addresslist' element={<AddressList/>} />
      </Routes>

    </div>
  );
}

export default App;
