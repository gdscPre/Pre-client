import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import Main from '../Main/Main';

export default function Supplement() {
  const navigate = useNavigate();

  const handleBackBtn = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="banner">
        <button onClick={handleBackBtn} className="back-btn">
          <GoArrowLeft />
        </button>
        <h3>영양제</h3>
      </div>
    </div>
  );
}
