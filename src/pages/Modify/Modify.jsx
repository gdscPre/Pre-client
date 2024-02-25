// 마이 페이지 수정

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './Modify.css';
import { Button, IconButton, TextField, Grid } from '@mui/material';
import { BsTrash } from 'react-icons/bs';
import { getMainPage } from '../../apis/mainpage';
import { modifyInfo } from '../../apis/Modify';


export default function Modify() {

  const navigate = useNavigate();
  const [data, setData] = useState();
  // const [supplements, setSupplements] = useState([]);
  const [week, setWeek] = useState(0);
  const [day, setDay] = useState(0);
  const [bName, setBname] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMainPage().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if(loading) return <div className="loading-state">로딩중...</div>;

  const handleWeek = e => {
    setWeek(e.target.value);
  }

  const handleDay = e => {
    setDay(e.target.value);
  }

  const handleBname = e => {
    setBname(e.target.value);
    console.log(bName);
  }

  const handleModifyBtn = () => {
    modifyInfo(bName, week, day);
    navigate("/main");
  }
  return (
    <div className="container">
      {/* <header>{user_name}님</header> */}

      {/* 임신 주차  */}
      <div className="pregnant-time">
        <h2>임신 주차</h2>
        <div id="pregnant-time-container">
          <input onChange={handleWeek} id="week" placeholder={data.week} type="number" value={week} required></input>
          <h3>주</h3>

          <input onChange={handleDay} id="day" placeholder={data.day} type="number" value={day} required></input>
          <h3>일</h3>
        </div>
      </div>

      {/* 태명  */}
      <div className="bName-container">
        <h2>태명</h2>
        <input onChange={handleBname} type="text" className="bName" placeholder={data.b_name} value={bName} required />
      </div>



      {/* 수정 완료 버튼  */}
      <Button
        onClick={handleModifyBtn}
        id="modify-button"
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 3,
          backgroundColor: '#D14D72',
          '&:hover': {
            backgroundColor: '#FFA8B9',
          },
          width: '86%',
          borderRadius: '50px',
        }}
        size="large">
        수정 완료
      </Button>
    </div>
  );
}
