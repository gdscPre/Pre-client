// 마이 페이지

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Mypage.css';
import {
  dialogClasses,
  Button,
  TextField,
  FormControl,
  FormHelperText,
  IconButton,
  Grid,
  Box,
  Container,
} from '@mui/material';

export default function Modify() {
  const navigate = useNavigate();

  const handleModifyClick = () => {
    navigate('/users/modify');
  };

  return (
    <div className="container">
      <header>(user name)님</header>

      <div className="pregnant-time">
        <h2>임신 주차</h2>
        <div id="pregnant-time-container">
          <div id="week">14</div>
          <h3>주</h3>

          <div id="day">3</div>
          <h3>일</h3>
        </div>
      </div>

      <div className="bName-container">
        <h2>태명</h2>
        <div className="bName">새싹이</div>
      </div>

      <div className="supplement-container">
        <h2>영양제</h2>
        <div id="supplement">엽산 400</div>
      </div>

      <Button
        id="modify-button"
        onClick={handleModifyClick}
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 5,
          mb: 8,
          backgroundColor: '#D14D72',
          '&:hover': {
            backgroundColor: '#FFA8B9',
          },
          width: '86%',
          borderRadius: '50px',
        }}
        size="large">
        수정하기
      </Button>
    </div>
  );
}
