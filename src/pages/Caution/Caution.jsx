import React from 'react'
import Footer from '../Footer/Footer'
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from 'react-router-dom';



export default function Caution() {
  const navigate = useNavigate();

  const handleBackBtn = () => {
    navigate("/main");
  }

  return (
    <div className='container'>
      <div className="banner">
        <button onClick={handleBackBtn} className='back-btn'>
          <GoArrowLeft />
        </button>
        <h3>식단 기록하기</h3>
      </div>
      <Footer/>
    </div>
  )
}
