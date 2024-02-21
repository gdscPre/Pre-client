// 마이 페이지 수정

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './Modify.css';
import { Button, IconButton, TextField, Grid } from '@mui/material';
import { BsTrash } from 'react-icons/bs';
import InputAdornment from '@mui/material/InputAdornment';

export default function Modify() {
  return (
    <div className="container">
      {/* <header>{user_name}님</header> */}

      {/* 임신 주차  */}
      <div className="pregnant-time">
        <h2>임신 주차</h2>
        <div id="pregnant-time-container">
          <input id="week" placeholder="14" type="number"></input>
          <h3>주</h3>

          <input id="day" placeholder="5" type="number"></input>
          <h3>일</h3>
        </div>
      </div>

      {/* 태명  */}
      <div className="bName-container">
        <h2>태명</h2>
        <input type="text" className="bName" placeholder="새싹이" />
      </div>

      {/* 영양제  */}
      <div className="supplement-container">
        <h2>영양제</h2>
        {supplements.map(supplement => (
          <Grid item xs={12} key={supplement.id}>
            <TextField
              // sx={{ backgroundColor: 'lightblue' }}
              className="modify-supplement"
              required
              id={`supplement_${supplement.id}`}
              name={`supplement_${supplement.id}`}
              // label={`영양제 ${supplement.id}`}
              placeholder={`영양제 ${supplement.id}`}
              error={false}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="secondary"
                      onClick={() => handleRemoveSupplement(supplement.id)}
                      aria-label="remove supplement">
                      <BsTrash size={'18px'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: false, // 레이블이 위로 올라가지 않도록 설정
              }}
            />
          </Grid>
        ))}
      </div>

      {/* 영양제 추가 버튼  */}
      <Button
        onClick={handleAddSupplement}
        sx={{
          mt: 3,
          alignSelf: 'center',
          border: '1px solid #a8a8a8',
          borderRadius: '50px',
          width: '180px',
          backgroundColor: '#FFF7F8',

          height: '30px',
          color: '#7b7b7b',
          '&:hover': {
            backgroundColor: '#FCC8D1',
          },
        }}>
        + supplements
      </Button>

      {/* 수정 완료 버튼  */}
      <Button
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
