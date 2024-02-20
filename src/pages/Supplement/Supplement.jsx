import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import { BiCalendar } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { PiPillLight } from "react-icons/pi";
import { showSupplement } from '../../apis/showSupplement';

import './Supplement.css';


export default function Supplement() {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  //년도
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const formattedDate = `${year}년 ${month}월 
  ${day}일`;
  const handleBackBtn = () => {
    navigate(-1);
  }
  useEffect(() => {
    showSupplement().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if(loading) return <div className="loading-state">로딩중...</div>;


  function getDayOfWeek(day) {
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
    const dayOfWeek = week[day.getDay()];
    return dayOfWeek;
  }

  function handleModifySupplements() {
    
  }

  

  return (
    <div className='container'>
      <div className="banner">
        <button onClick={handleBackBtn} className='back-btn'>
          <GoArrowLeft />
        </button>
        <h3 className='check-banner'>영양제</h3>
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

      <div className="supplement-list">
        <div className="supplement-box selected-box">
          <span>drug 1</span>
        </div>
        {data.map((supplement, index) => (
          <div key={index} className={`supplement-box`}>
            <PiPillLight />
            <span>{supplement.supplement_id}</span>
          </div>
        ))}
        
      </div>


    </div>

    
  )
}
