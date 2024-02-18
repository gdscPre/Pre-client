import React, { useEffect, useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";

const User = {
  email: 'test@example.com',
  pw: 'test2323@@@'
};

export default function Login() {

  const logoSrc = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmcIeo%2FbtsEZn2Olne%2Fl7MSODROrPaXghuXcc0fb0%2Fimg.png';
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


  // const onClickConfirmButton = () => {
  //   if(email === User.email && pw === User.pw) {
  //     alert('로그인에 성공');
  //     navigate("/main");
  //   } else {
  //     alert('등록되지 않은 회원입니다.');
  //   }
  // }

  const onClickConfirmButton = () => {
    // 요청을 보내는 부분
    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: pw
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // 응답을 처리하는 부분
      alert('로그인에 성공');
      navigate("/main");
    })
    .catch(error => {
      alert('등록되지 않은 회원입니다.');
    });
  }



  const onClickRegisterButton = () => {
    navigate("/users/join");
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
      <img src={logoSrc} alt="" id="logo" />
      <form id="input">
        <div className="email email-input">
          <span>이메일</span>
          <input 
            type="email" placeholder="email"
            value={email}
            onChange={handleEmail} required></input>
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
          onChange={handlePw} required></input>
          <div className="errorMessageWrap">
            {
              !pwValid && pw.length > 0 && (
                <span>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</span>
              )
            }
          </div>
        </div>
      </form>

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

