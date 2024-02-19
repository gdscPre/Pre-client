import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import axios from 'axios';
import { Button, TextField, FormControl, FormHelperText, IconButton, Grid, Box, Container } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BsTrash } from 'react-icons/bs';

import './Signup.css';

const Register = () => {
  const theme = createTheme();
  // const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [bNameError, setbNameError] = useState('');
  const [supplementError, setsupplementError] = useState('');

  const [registerError, setRegisterError] = useState('');

  const navigate = useNavigate();

  // 초기 '가입 완료하기' 버튼 색상
  const [buttonColor, setButtonColor] = useState('#FCC8D1');

  // 가입 메시지
  const [joinMessage, setJoinMessage] = useState('');

  const handleBackBtn = () => {
    navigate(-1);
  };

  // const handleAgree = event => {
  //   setChecked(event.target.checked);
  // };

  const onhandlePost = async data => {
    const { email, name, password } = data;
    const postData = { email, name, password };

    // post
    await axios
      .post('/member/join', postData)
      .then(response => {
        History.push('/login');
      })
      .catch(err => {
        console.log(err);
        setJoinMessage('회원가입에 실패하였습니다. 모든 정보를 확인해주세요!');
      });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      email: data.get('email'),
      name: data.get('name'),
      password: data.get('password'),
      rePassword: data.get('rePassword'),
      week: data.get('week'),
      day: data.get('day'),
      bName: data.get('bName'),
      supplement: data.get('supplement'),
    };
    const { email, name, password, rePassword, week, day, bName, supplement } = joinData;

    // 이메일 유효성 체크
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');

    // 비밀번호 유효성 체크
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password)) setPasswordState('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
    else setPasswordState('');

    // 비밀번호 같은지 체크
    if (password !== rePassword) setPasswordError('비밀번호가 일치하지 않습니다.');
    else setPasswordError('');

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1) setNameError('올바른 이름을 입력해주세요.');
    else setNameError('');

    // 태명 유효성 검사
    const bNameRegex = /^[가-힣a-zA-Z]+$/;
    if (!bNameRegex.test(bName) || bName.length < 1) setbNameError('올바른 태명을 입력해주세요.');
    else setbNameError('');

    // 영양제 이름 유효성 검사
    const supplementRegex = /^[가-힣a-zA-Z]+$/;
    if (!supplementRegex.test(supplement) || supplement.length < 1) {
      setsupplementError('올바른 영양제 이름을 입력해주세요.');
    } else {
      setsupplementError('');
    }

    if (
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === rePassword &&
      nameRegex.test(name) &&
      bNameRegex.test(bName) &&
      bNameRegex.test(supplement)
      // checked
    ) {
      onhandlePost(joinData);
      setJoinMessage('가입이 가능합니다'); // 가입 가능한 상황일 때 메시지 업데이트
      setButtonColor('#D14D72'); // 버튼 색상 변경
    } else {
      setJoinMessage('모든 정보를 확인해주세요!'); // 가입이 불가능한 상황일 때 메시지 업데이트
      setButtonColor('#FCC8D1'); // 초기 버튼 색상으로 변경
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
    <div className="">
      <Example3 />
    </div>
  );
};
