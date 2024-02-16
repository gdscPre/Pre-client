import React, { useEffect, useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";

const User = {
  email: 'test@example.com',
  pw: 'test2323@@@'
};

export default function Login() {

  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const [notAllow, setNotAllow] = useState(true);
  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if(regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    
  }

  const handlePw = (e) => {
    setPw(e.target.value);
    const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if(regex.test(pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  }


  const onClickConfirmButton = () => {
    if(email === User.email && pw === User.pw) {
      alert('로그인에 성공');
      navigate("/");
    } else {
      alert('등록되지 않은 회원입니다.');
    }
  }

  const onClickRegisterButton = () => {
    navigate("/Signup");
  }
  useEffect(() => {
    if(emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);
  return (
    <div className='container'>
      <h1>Pre</h1>
      <div id="input">
        <div className="email email-input">
          <span>이메일</span>
          <input 
            type="email" placeholder="email"
            value={email}
            onChange={handleEmail}></input>
          <div className="errorMessageWrap">
            {
              !emailValid && email.length > 0 && (
                <span>올바른 이메일을 입력해주세요.</span>
              )
            }
          </div>
        </div>

        <div className="password password-input">
          <span>비밀번호</span>
          <input type="password" placeholder="password"
          value={pw}
          onChange={handlePw}></input>
          <div className="errorMessageWrap">
            {
              !pwValid && pw.length > 0 && (
                <span>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</span>
              )
            }
          </div>
        </div>
      </div>

      <div className='button'>
        <button disabled={notAllow}
        onClick={onClickConfirmButton} id='login-button'>
          <span>로그인</span>
        </button>
        <hr></hr>
        <button onClick={onClickRegisterButton} id='register-button'>
          <span>회원가입</span>
        </button>
      </div>

    </div>
  );
}

