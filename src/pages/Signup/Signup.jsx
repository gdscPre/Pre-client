import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import { BsTrash } from 'react-icons/bs';
import { signUp } from '../../apis/signUp';
import './Signup.css';
import axios from 'axios';

export default function Join() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [b_name, setBName] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [week, setWeek] = useState(0);
  const [day, setDay] = useState(0);
  const [supplements, setSupplements] = useState([]);
  const [sequence, setSequence] = useState(null);
  let emailValid = false;
  let passwordValid = false;
  let nameValid = false;
  let bNameValid = false;
  let rePasswordValid = false;
  let weekValid = false;
  let dayValid = false;
  let supplementsValid = true;

  const [notAllow, setNotAllow] = useState(true);
  
  const refSupplement = useRef();
  let finSupplements = [];
  const deleteImg = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FEKSSq%2FbtsFeQLBicE%2FpGk2QkyrCJrOtNkEkGcgSK%2Fimg.png';
  //이메일
  const handleEmail = e => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(email)) {
      emailValid = true;
    } else {
      emailValid = false;
    }
  };

  //비밀번호
  const handlePassword = e => {
    setPassword(e.target.value);
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    passwordValid = regex.test(e.target.value);
  };

  //비밀번호 확인
  const handleRePassword = e => {
    setRePassword(e.target.value);
    rePasswordValid = password === e.target.value;
  };

  //이름
  const handleName = e => {
    setName(e.target.value);
    const regex = /^[가-힣a-zA-Z\s]+$/;
    nameValid = regex.test(e.target.value);
  };

  // 임신 주차
  const handleWeek = e => {
    setWeek(e.target.value);
  };

  const handleDay = e => {
    setDay(e.target.value);
  };

  // 태명
  const handleBName = e => {
    setBName(e.target.value);

  };

  //영양제
  if(supplements.length === 0) supplementsValid = false; 
  else supplementsValid = true;

  useEffect(() => {
    if (
      emailValid &&
      passwordValid &&
      nameValid &&
      bNameValid &&
      rePasswordValid &&
      weekValid &&
      dayValid &&
      supplementsValid
    ) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, passwordValid, nameValid, bNameValid, rePasswordValid, weekValid, dayValid, supplementsValid]);

  // const handleAgree = event => {
  //   setChecked(event.target.checked);
  // };

  //뒤로 가기
  const handleBackBtn = () => {
    navigate("users/login");
  };

  // 영양제 추가
  const handleAddSupplement = (item) => {
    if(sequence === null) {
      return
    }
    let supple = [...supplements];
    supple.push({id:sequence+1,text:item});

    window.localStorage.setItem("supplements", JSON.stringify(supple));
    window.localStorage.setItem("sequence", String(sequence+1));

    setSupplements(supple);
    setSequence(sequence+1);
    refSupplement.current.value=''
  };
  // 영양제 삭제
  const handleRemoveSupplement = (id) => {
   let supple = [...supplements];
   supple = supple.filter((val)=>val.id !== id);

   window.localStorage.setItem("supplements", JSON.stringify(supple));
   setSupplements(supple);

  };

  const handleSignupBtn = async () => {
    supplements.forEach(element => {
      console.log(element.text);
      finSupplements.push(String(element.text));
      console.log(finSupplements);
    });
    await signUp(email, password, name, week, day, b_name, finSupplements);
    navigate("/users/login");
  };

  useEffect(() => {
    let sequence = window.localStorage.getItem("sequence");
    if(sequence === null) {
      window.localStorage.setItem("sequence", "0");
      sequence = 0;
    }
    const handleSetInit = () => {
      window.localStorage.setItem("supplements", "[]");
      return "[]";
    }
    let supple = JSON.parse(window.localStorage.getItem("supplements")??handleSetInit());

    setSupplements(supple);
    setSequence(Number(sequence));
  }, [])

  console.log(supplements);

  return (
    <div className="container">
      <header>
        <button onClick={handleBackBtn} className="back-btn">
          <GoArrowLeft />
        </button>
        <h3>회원가입</h3>
      </header>
      <form className="input">
        {/* 이메일 */}
        <div className="email-input">
          <span>이메일</span>
          <input type="email" placeholder="email" value={email} onChange={handleEmail} required></input>

          <div className="errorMessageWrap">
            {!emailValid && email.length > 0 && <span>올바른 이메일을 입력해주세요.</span>}
          </div>
        </div>

        {/* 비밀번호  */}
        <div className="password-input">
          <span>비밀번호</span>
          <input type="password" placeholder="password" value={password} onChange={handlePassword} required></input>
          <div className="errorMessageWrap">
            {!passwordValid && password.length > 0 && <span>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</span>}
          </div>
        </div>

        {/* 비밀번호 확인  */}
        <div className="password-check-input">
          <span>비밀번호 확인</span>
          <input type="password" placeholder="password" value={rePassword} onChange={handleRePassword} required></input>
        </div>

        {/* 이름 */}
        <div className="name-input">
          <span>이름</span>
          <input type="text" placeholder="name" value={name} onChange={handleName} required></input>
          <div className="errorMessageWrap">
            {!nameValid && name.length > 0 && <span>올바른 이름을 입력해주세요.</span>}
          </div>
        </div>

        {/* 임신 주차  */}
        <div className="pregnancy-time">
          <span>임신 주차</span>
          <div className="pregnancy-time-container">
            <input type="number" placeholder="week" value={week} onChange={handleWeek} required></input>
            <span>주</span>
            <input type="number" placeholder="day" value={day} onChange={handleDay} required></input>
            <span>일</span>
          </div>

        </div>

        {/* 태명  */}
        <div className="b-name-input">
          <span>태명</span>
          <input type="text" placeholder="name" value={b_name} onChange={handleBName} required></input>
          <div className="errorMessageWrap">
            {!bNameValid && b_name.length <= 0 && <span>올바른 태명을 입력해주세요.</span>}
          </div>
        </div>

        {/* 영양제  */}
        <div className={`supplements-input`}>
          <span>영양제</span>
            <div className="supplements-item">
              <input
                type="text"
                placeholder="supplements"
                ref={refSupplement}
                required
              />
                    {/* 영양제 추가 버튼  */}
            <button onClick={() => handleAddSupplement(refSupplement.current.value)} className="add-supplements">
              + 추가
            </button>
            </div>
            <div className="supplementList">
              {supplements.map((val, idx) => 
                <div className="suppleItem" key={idx}>
                  <div className="item-box">
                    <span>{val.text}</span>
                  </div>
                  <div className="delete-box" onClick={()=>handleRemoveSupplement(val.id)}>
                    <img src={deleteImg} alt="" />
                  </div>
                </div>
              )}
            </div>
        </div>
      </form>


      {/* 가입이 가능한지에 따라 텍스트 다르게  */}
      {(!emailValid ||
        !passwordValid ||
        !nameValid ||
        !bNameValid ||
        !rePasswordValid ||
        !weekValid ||
        !dayValid ||
        !supplementsValid) && (
        <div className="joinErrorMessageWrap">
          <span style={{ color: 'red' }}>모든 정보를 확인해주세요.</span>
        </div>
      )}
      {emailValid &&
        passwordValid &&
        nameValid &&
        bNameValid &&
        rePasswordValid &&
        weekValid &&
        dayValid &&
        supplementsValid && (
          <div className="joinSuccessMessageWrap">
            <span>가입이 가능합니다!</span>
          </div>
        )}

      {/* 가입 완료 버튼  */}
      <button onClick={handleSignupBtn} className="join-finish">
        가입 완료하기
      </button>
    </div>
  );
}