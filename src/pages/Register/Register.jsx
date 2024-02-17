import React, { useEffect, useState } from 'react';
import { GoArrowLeft } from 'react-icons/go';
import { CiSearch } from 'react-icons/ci';
import { AiFillPlusCircle } from 'react-icons/ai';

import './Register.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const handleBackBtn = () => {
    navigate(-1);
  };

  const handleRegisterBtn = () => {};

  const handleOwnRegisterBtn = () => {
    navigate('./own');
  };
  return (
    <div className="container">
      <div className="banner">
        <button onClick={handleBackBtn} className="back-btn">
          <GoArrowLeft />
        </button>
        <h3>식단 기록하기</h3>
      </div>
      <div className="search-box">
        <CiSearch />
        <input type="text" placeholder="무슨 음식을 드셨나요?" />
      </div>
      <div className="food-list">
        <div className="food food-1">
          <div className="food-top">
            <h3>음식</h3>
            <AiFillPlusCircle />
          </div>
          <div className="nutrition-info">
            <span>탄수화물(100g)</span>
            <span>단백질(5g)</span>
            <span>열량(290kcal)</span>
          </div>
        </div>
        <div className="food food-2">
          <div className="food-top">
            <h3>음식</h3>
            <AiFillPlusCircle />
          </div>
          <div className="nutrition-info">
            <span>탄수화물(100g)</span>
            <span>단백질(5g)</span>
            <span>열량(290kcal)</span>
          </div>
        </div>
        <div className="food food-3">
          <div className="food-top">
            <h3>음식</h3>
            <AiFillPlusCircle />
          </div>
          <div className="nutrition-info">
            <span>탄수화물(100g)</span>
            <span>단백질(5g)</span>
            <span>열량(290kcal)</span>
          </div>
        </div>
        <div className="food food-4">
          <div className="food-top">
            <h3>음식</h3>
            <AiFillPlusCircle />
          </div>
          <div className="nutrition-info">
            <span>탄수화물(100g)</span>
            <span>단백질(5g)</span>
            <span>열량(290kcal)</span>
          </div>
        </div>
        <div className="food food-5">
          <div className="food-top">
            <h3>음식</h3>
            <AiFillPlusCircle />
          </div>
          <div className="nutrition-info">
            <span>탄수화물(100g)</span>
            <span>단백질(5g)</span>
            <span>열량(290kcal)</span>
          </div>
        </div>
      </div>
      <div className="btn-box">
        <button onClick={handleRegisterBtn}>
          <span>등록하기</span>
        </button>
        <div className="link-view"></div>
        <button onClick={handleOwnRegisterBtn}>
          <span>직접 등록하기</span>
        </button>
      </div>
    </div>
  );
}
