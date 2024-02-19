// 마이 페이지 수정

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Modify.css';
import {
  dialogClasses,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  TextField,
  Grid,
  Box,
  Container,
} from '@mui/material';
import { BsTrash } from 'react-icons/bs';
import InputAdornment from '@mui/material/InputAdornment';
import { BorderColor } from '@mui/icons-material';

export default function Modify() {
  // const [checked, setChecked] = useState(false);

  const [bNameError, setbNameError] = useState('');
  const [supplementError, setsupplementError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      week: data.get('week'),
      day: data.get('day'),
      bName: data.get('bName'),
      supplement: data.get('supplement'),
    };
    const { week, day, bName, supplement } = joinData;

    // 태명 유효성 검사
    const bNameRegex = /^[가-힣a-zA-Z]+$/;
    if (!bNameRegex.test(bName) || bName.length < 1) setbNameError('올바른 태명을 입력해주세요.');
    else setbNameError('');

    const supplementRegex = /^[^!@#$%^&*(),.?":{}|<>0-9]+$/;
    if (!supplement || !supplementRegex.test(supplement) || supplement.length < 1) {
      setsupplementError('올바른 영양제 이름을 입력해주세요.');
    } else {
      setsupplementError('');
    }
  };

  // 영양제 추가
  const [supplements, setSupplements] = useState([{ id: 1, name: '' }]);

  const handleAddSupplement = () => {
    const newSupplement = { id: supplements.length + 1, name: ' ' };
    setSupplements([...supplements, newSupplement]);
  };

  // 영양제 삭제
  const handleRemoveSupplement = id => {
    if (supplements.length === 1) {
      // 최소한 영양제 하나는 존재하도록
      return;
    }
    const updatedSupplements = supplements.filter(supplement => supplement.id !== id);
    setSupplements(updatedSupplements);
  };

  return (
    <div className="container">
      <header>(user name)님</header>

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
              sx={{
                mb: '4',
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#E0E2E6', // 초기 상태의 색상
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: '#FFA8B9', // 마우스 호버 시의 색상
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#FFA8B9', // 클릭 시의 색상
                },
              }}
              required
              id={`supplement_${supplement.id}`}
              name={`supplement_${supplement.id}`}
              label={`영양제 ${supplement.id}`}
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
