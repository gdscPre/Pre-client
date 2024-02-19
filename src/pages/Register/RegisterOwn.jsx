import React from 'react';
import { GoArrowLeft } from 'react-icons/go';
import './RegisterOwn.css';
import { useNavigate } from 'react-router-dom';

export default function RegisterOwn() {
  const navigate = useNavigate();

  const handleBackBtn = () => {
    navigate(-1);
  };

  const handleRegisterBtn = () => {};
  return (
    <div className="container">
      <div className="banner">
        <button onClick={handleBackBtn} className="back-btn">
          <GoArrowLeft />
        </button>
        <h3>식단 등록하기</h3>
      </div>
      <div className="register-box">
        <h3>음식 이름</h3>
        <div className="input-box">
          <input type="text" />
        </div>
        <h3>탄수화물</h3>
        <div className="input-box">
          <input type="number" />
          <span>g</span>
        </div>
        <h3>단백질</h3>
        <div className="input-box">
          <input type="number" />
          <span>g</span>
        </div>
        <h3>열량</h3>
        <div className="input-box">
          <input type="number" />
          <span>kcal</span>
        </div>
      </div>
      <button className="register-btn" onClick={handleRegisterBtn}>
        <span>등록하기</span>
      </button>
    </div>
  );
}
