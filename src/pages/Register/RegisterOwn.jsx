import React, { useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import './RegisterOwn.css';
import { useNavigate } from 'react-router-dom';
import { foodRecord } from '../../apis/foodRecord';


export default function RegisterOwn() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [kcal, setKcal] = useState();
  const [carbs, setCarbs] = useState();
  const [protein, setProtein] = useState();

  //음식이름
  const handleName = e => {
    setName(e.target.value);
    // console.log(name);
  }
  //탄수화물세팅
  const handleCarbs = e => {
    setCarbs(e.target.value);
    // console.log(carbs);
  }
  //단백질세팅
  const handleProtein = e => {
    setProtein(e.target.value);
    // console.log(protein);
  }
  //열량세팅
  const handleKcal = e => {
    setKcal(e.target.value);
    // console.log(kcal);
  }

  const handleBackBtn = () => {
    navigate(-1);
  }

  const handleRegisterBtn = async () => {
    const date = new Date().toISOString(); // 현재 날짜와 시간을 가져옵니다
    await foodRecord(name, kcal, carbs, protein, date);
    alert('등록이 완료되었습니다. ☺️');
    navigate(-1);
  }

  return (
    <div className='container'>
      <div className="banner">
        <button onClick={handleBackBtn} className='back-btn'>
          <GoArrowLeft />
        </button>
        <h3>식단 등록하기</h3>
      </div>
      <form className="register-box">
        <h3>음식 이름</h3>
        <div className="input-box">
          <input type="text" value={name} onChange={handleName} required /> 
        </div>
        <h3>탄수화물</h3>
        <div className="input-box">
          <input type="number" value={carbs} onChange={handleCarbs} required />
          <span>g</span>
        </div>
        <h3>단백질</h3>
        <div className="input-box">
          <input type="number" value={protein} onChange={handleProtein} required />
          <span>g</span>
        </div>
        <h3>열량</h3>
        <div className="input-box">
          <input type="number" value={kcal} onChange={handleKcal} required />
          <span>kcal</span>
        </div>
      </form>
      <button className='register-btn' onClick={handleRegisterBtn}>
        <span>등록하기</span>
      </button>
    </div>
  )
}
