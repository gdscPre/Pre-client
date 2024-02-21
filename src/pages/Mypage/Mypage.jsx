// 마이 페이지
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mypage.css';
import { Button } from '@mui/material';

import { getMyPage } from '../../apis/myPage';

export default function Modify() {
  //  수정하기 버튼 누르면 modify 로 이동
  // 현재 페이지에서 modify 페이지로 이동할 때 데이터 전달
  const navigate = useNavigate();
  const handleModifyClick = () => {
    navigate('/users/modify', {
      state: {
        week: data?.week,
        day: data?.day,
        b_name: data?.b_name,
        user_name: data?.user_name,
        supplements: data?.supplements,
      },
      replace: true, // 이전 경로를 교체 (patch)
    });
  };

  const [data, setData] = useState();

  useEffect(() => {
    getMyPage().then(res => {
      setData(res);
    });
  }, []);

  return (
    <div className="container">
      <header>{data?.user_name}님</header>
      <div className="pregnant-time">
        <h2>임신 주차</h2>
        <div id="pregnant-time-container">
          <div id="week">{data?.week}</div>
          <h3>주</h3>

          <div id="day">{data?.day}</div>
          <h3>일</h3>
        </div>
      </div>
      <div className="bName-container">
        <h2>태명</h2>
        <div className="bName">{data?.b_name}</div>
      </div>
      <div className="supplement-container">
        <h2>영양제</h2>
        <div id="mypage-supplement">{data?.supplements}</div>
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
