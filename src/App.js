import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Signup from './pages/Signup/Signup';
import Analysis from './pages/Analysis/Analysis';
import Register from './pages/Register/Register';
import Supplement from './pages/Supplement/Supplement';
import RegisterOwn from './pages/Register/RegisterOwn';
import axios from 'axios';
import { useEffect } from 'react';
import Mypage from './pages/Mypage/Mypage';
import Caution from './pages/Caution/Caution';
import Modify from './pages/Modify/Modify';

function App() {

  //서버 데이터 console 로 확인
  // useEffect(() => {
  //   axios.get('/api/test')
  //     .then(res => console.log(res))
  //     .catch()
  // })
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/users/login" element={<Login/>} />
          <Route path="/main" element={<Main/>} />
          <Route path="/users/join" element={<Signup/>} />
          <Route path='/diet/analysis' element={<Analysis/>} />
          <Route path='/diet/list' element={<Register />} />
          <Route path='/supplement' element={<Supplement/>} />
          <Route path='/users/mypage' element={<Mypage/>} />
          <Route path='/diet/record' element={<RegisterOwn />} />
          <Route path='/tip' element={<Caution />} />
          <Route path='/users/modify' element={<Modify />} />

          <Route path='/*' element={<Login />} />
        </Routes>

      </BrowserRouter>
  );
}

export default App;
