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
    if (!nameRegex.test(name) || name.length < 1) setNameError('올바른 태명을 입력해주세요.');
    else setNameError('');

    // 태명 유효성 검사
    const bNameRegex = /^[가-힣a-zA-Z]+$/;
    if (!bNameRegex.test(bName) || bName.length < 1) setbNameError('올바른 태명을 입력해주세요.');
    else setbNameError('');

    // 영양제 이름 유효성 검사
    const supplementRegex = /^[^!@#$%^&*(),.?":{}|<>0-9]+$/;
    if (!supplement || !supplementRegex.test(supplement) || supplement.length < 1) {
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
    const updatedSupplements = supplements.filter(supplement => supplement.id !== id);
    setSupplements(updatedSupplements);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <div className="banner">
          <button onClick={handleBackBtn} className="back-btn">
            <GoArrowLeft />
          </button>
          <h3>회원가입</h3>
        </div>

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 3,
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FFA8B9', // 입력란에 포커스가 있을 때 테두리 색상
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
                caretColor: '#FFA8B9', // 입력란에 포커스가 있을 때 커서 색상
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#FFA8B9', // 입력란에 포커스가 있을 때 라벨 색상을 #FFA8B9로 변경
              },
              '& .MuiOutlinedInput-input': {
                backgroundColor: '#FFF7F8', // 입력란의 배경 색상을 #FFA8B9로 변경
              },
              '& .MuiOutlinedInput-root.Mui-focused.MuiFilledInput-root': {
                backgroundColor: '#FFF7F8', // 자동 완성 값이 채워졌을 때 배경색을 #FFA8B9로 설정
              },
            }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                {/* 이메일  */}
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일"
                    error={emailError !== '' || false}
                  />
                </Grid>
                <formhelpertext>{emailError}</formhelpertext>

                {/* 비밀번호  */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    error={passwordState !== '' || false}
                  />
                </Grid>
                <formhelpertext>{passwordState}</formhelpertext>

                {/* 비밀번호 확인  */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 확인"
                    error={passwordError !== '' || false}
                  />
                </Grid>
                <formhelpertext>{passwordError}</formhelpertext>

                {/* 이름 */}
                <Grid item xs={12}>
                  <TextField required fullWidth id="name" name="name" label="이름" error={nameError !== '' || false} />
                </Grid>
                <formhelpertext>{nameError}</formhelpertext>

                {/* 임신 주차  */}
                <Grid item xs={12}>
                  <div id="pregnant-time">
                    <TextField
                      required
                      type="number"
                      id="week"
                      name="week"
                      label="weeks"
                      sx={{ width: '40%', mr: '2%' }}
                    />{' '}
                    주
                    <TextField
                      required
                      type="number"
                      id="day"
                      name="day"
                      label="days"
                      sx={{ width: '40%', mr: '2%', ml: '4%' }}
                    />{' '}
                    일
                  </div>
                </Grid>

                {/* 태명 */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="bName"
                    name="bName"
                    label="태명"
                    error={nameError !== '' || false}
                  />
                </Grid>
                <formhelpertext>{bNameError}</formhelpertext>

                {/* 영양제 */}
                {supplements.map(supplement => (
                  <Grid item xs={12} key={supplement.id}>
                    <Grid container alignItems="center">
                      <TextField
                        required
                        id={`supplement_${supplement.id}`}
                        name={`supplement_${supplement.id}`}
                        label={`영양제 ${supplement.id}`}
                        error={false}
                        sx={{ width: '91%' }}
                      />
                      <IconButton
                        color="secondary"
                        onClick={() => handleRemoveSupplement(supplement.id)}
                        aria-label="remove supplement">
                        <BsTrash size={'18px'} />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <formhelpertext>{supplementError}</formhelpertext>
              </Grid>

              {/* 영양제 추가 버튼  */}
              <Button
                onClick={handleAddSupplement}
                sx={{
                  alignSelf: 'center',
                  border: '1px solid #a8a8a8',
                  borderRadius: '50px',
                  width: '180px',
                  backgroundColor: '#FFF7F8',
                  mt: '7%',
                  color: '#7b7b7b',
                  '&:hover': {
                    backgroundColor: '#FCC8D1',
                  },
                }}>
                + supplements
              </Button>
              {/* <span>{joinMessage}</span> */}
              {/* 가입 완료하기 버튼 */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 5,
                  mb: 8,
                  backgroundColor: buttonColor,
                  '&:hover': {
                    backgroundColor: '#D14D72', // 마우스 호버 시의 배경 색상 변경
                  },
                }}
                size="large"
                id="join-finish">
                가입 완료하기
              </Button>
            </FormControl>
            <formhelpertext>{registerError}</formhelpertext>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Register;
