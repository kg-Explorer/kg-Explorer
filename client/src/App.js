import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components';
import { Main, Post, Test } from './page'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">

      <Header />
          
      {/* Route stage */}
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/post' element={<Post/>} />
        <Route path='/test' element={<Test/>} />
      </Routes>

    </div>
  );
}

export default App;
