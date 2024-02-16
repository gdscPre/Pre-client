import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Signup from './pages/Signup/Signup';
import Analysis from './pages/Analysis/Analysis';
import Register from './pages/Register/Register';
import Supplement from './pages/Supplement/Supplement';
import RegisterOwn from './pages/Register/RegisterOwn';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Main/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path='/analysis' element={<Analysis/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/supplement' element={<Supplement/>} />
          <Route path='/register/own' element={<RegisterOwn />} />
          <Route path='/*' element={<Main />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
