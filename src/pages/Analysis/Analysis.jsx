import React, { useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { PieChart } from 'react-minimal-pie-chart';

import './Analysis.css';


export default function Analysis() {
  const navigate = useNavigate();
  const today = new Date();
  //년도
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const formattedDate = `${year}년 ${month}월 
  ${day}일`;

  const kcal = useState(0);
  //추가 수정 예정 -> 임신 초중기, 후기 별로 다름
  const appropriateKcal = useState(2340);

  const carbohydrate = useState(0);
  const appropriateCarbohydrate = useState(0);
  const protein = useState(0);
  const nutritionState = ['더', '덜', '부족', '적당', '과잉'];

  function getDayOfWeek(day) {
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
    const dayOfWeek = week[day.getDay()];
    return dayOfWeek;
  }

  const handleBackBtn = () => {
    navigate(-1);
  }
  return (
    <div className='container'>
      <div className="banner">
        <button onClick={handleBackBtn} className='back-btn'>
          <GoArrowLeft />
        </button>
        <h3>식단 분석</h3>
      </div>

      <h4 className='date-selected'>{formattedDate}</h4>
      <div className="calendar-days">
        <button className='btn-calendar'>
          <IoIosArrowBack />
        </button>
        <div className="day-box">
          <h2 className='week'>{getDayOfWeek(new Date(year, month, day - 4))}</h2>
          <div className="day">{day - 3}</div>
        </div>
        <div className="day-box">
          <h2 className='week'>{getDayOfWeek(new Date(year, month, day - 3))}</h2>
          <div className="day">{day - 2}</div>
        </div>
        <div className="day-box">
          <h2 className='week'>{getDayOfWeek(new Date(year, month, day - 2))}</h2>
          <div className="day">{day - 1}</div>
        </div>
        <div className="day-box">
          <h2 className='week'>{getDayOfWeek(new Date(year, month, day - 1))}</h2>
          <div className="day selected">{day}</div>
        </div>
        <div className="day-box">
          <h2 className='week'>{getDayOfWeek(new Date(year, month, day))}</h2>
          <div className="day">{day + 1}</div>
        </div>
        <div className="day-box">
          <h2 className='week'>{getDayOfWeek(new Date(year, month, day + 1))}</h2>
          <div className="day">{day + 2}</div>
        </div>
        <div className="day-box">
          <h2 className='week'>{getDayOfWeek(new Date(year, month, day + 2))}</h2>
          <div className="day">{day + 3}</div>
        </div>
        <button className='btn-calendar'>
          <IoIosArrowForward />
        </button>
      </div>

      <div className="analysis-box">
        <div className="kcal-box">
          <div className="box-left">
            <div className="box-top">
              <h3>열량</h3>
              <div className="nutri-state">{nutritionState[2]}</div>
            </div>
            <span>{kcal} kcal 를<br/>{nutritionState[1]} 섭취하셨습니다.</span>
          </div>
          <PieChart className='piechart'
            data={[
              { title: 'One', value: 15, color: '#FFA8B9' },
              { title: 'Two', value: 10, color: '#FFECEF' },
            ]}
          />
        </div>
        <div className="carbohydrate-box">
          <div className="box-left">
            <div className="box-top">
              <h3>탄수화물</h3>
              <div className="nutri-state">{nutritionState[4]}</div>
            </div>
            <span>{} g 을<br/>{nutritionState[0]} 섭취하셨습니다.</span>
          </div>
          <PieChart className='piechart'
            data={[
              { title: 'One', value: 15, color: '#FFA8B9' },
              { title: 'Two', value: 5, color: '#FFECEF' },
            ]}
          />
        </div>
        <div className="protein-box">
          <div className="box-left">
            <div className="box-top">
              <h3>단백질</h3>
              <div className="nutri-state">{nutritionState[4]}</div>
            </div>
            <span>{} g 을<br/>{nutritionState[0]} 섭취하셨습니다.</span>
          </div>
          
          <PieChart className='piechart'
            data={[
              { title: 'One', value: 15, color: '#FFA8B9' },
              { title: 'Two', value: 10, color: '#FFECEF' },
            ]}
          />
        </div>
      </div>
      <div id="line"></div>
      <div className="diet-list">
        <div className="diet-banner">
          <span className='row'>이름</span>
          <span className='row'>탄수화물</span>
          <span className='row'>단백질</span>
          <span className='row'>열량</span>
        </div>
        <div className="food-box food-1">
          <span className='row food-name'>아구찜</span>
          <span className='row'>{carbohydrate}g</span>
          <span className='row'>{protein}g</span>
          <span className='row'>{kcal}kcal</span>
        </div>
        <div className="food-box food-2">
          <span className='row food-name'>아구찜</span>
          <span className='row'>{carbohydrate}g</span>
          <span className='row'>{protein}g</span>
          <span className='row'>{kcal}kcal</span>
        </div>
        <div className="food-box food-3">
          <span className='row food-name'>아구찜</span>
          <span className='row'>{carbohydrate}g</span>
          <span className='row'>{protein}g</span>
          <span className='row'>{kcal}kcal</span>
        </div>
        

      </div>
    </div>
  )
}
