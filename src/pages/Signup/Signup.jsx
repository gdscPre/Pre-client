import React, { useEffect, useState } from 'react';
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

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [bNameValid, setBNameValid] = useState(false);
  const [rePasswordValid, setRePasswordValid] = useState(false);
  const [weekValid, setWeekValid] = useState(false);
  const [dayValid, setDayValid] = useState(false);
  const [supplementsValid, setSupplementsValid] = useState(false);

  const [notAllow, setNotAllow] = useState(true);

  //이메일
  const handleEmail = e => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  //비밀번호
  const handlePassword = e => {
    setPassword(e.target.value);
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordValid(regex.test(e.target.value));
  };

  //비밀번호 확인
  const handleRePassword = e => {
    setRePassword(e.target.value);
    setRePasswordValid(password === e.target.value);
  };

  //이름
  const handleName = e => {
    setName(e.target.value);
    const regex = /^[가-힣a-zA-Z\s]+$/;
    setNameValid(regex.test(e.target.value));
  };

  // 임신 주차
  const handleWeek = e => {
    const value = parseInt(e.target.value, 10);
    setWeek(value);

    // 숫자가 양수인지 확인
    setWeekValid(!isNaN(value) && value >= 0);
  };

  const handleDay = e => {
    const value = parseInt(e.target.value, 10);
    setDay(value);

    // 숫자가 양수인지 확인
    setDayValid(!isNaN(value) && value >= 0);
  };

  // 태명
  const handleBName = e => {
    setBName(e.target.value);

  };

  //영양제
  const handleSupplements = (index, e) => {

  };

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
  const handleAddSupplement = () => {
    // setSupplements([...supplements, newSupplement]);
  };
  // 영양제 삭제
  const handleRemoveSupplement = id => {
    if (supplements.length > 1) {
      const updatedSupplements = supplements.filter(supplement => supplement.id !== id);
      setSupplements(updatedSupplements);
    }
  };

  const handleSignupBtn = async () => {
    await signUp(email, name, password, rePassword, week, day, b_name, supplements);
    navigate("/main");
  };

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

          {(week < 0 || day < 0 || day > 6) && (
            <div className="errorMessageWrap">
              <span>일수에 7보다 작은 값을 입력해주세요</span>
            </div>
          )}
          {(!weekValid || !dayValid) && (
            <div className="errorMessageWrap">
              <span>임신 주차를 입력해주세요.</span>
            </div>
          )}
        </div>

        {/* 태명  */}
        <div className="b-name-input">
          <span>태명</span>
          <input type="text" placeholder="name" value={b_name} onChange={handleBName} required></input>
          <div className="errorMessageWrap">
            {!bNameValid && b_name.length > 0 && <span>올바른 태명을 입력해주세요.</span>}
          </div>
        </div>

        {/* 영양제  */}
        <div className={`supplements-input ${supplements.length === 1 ? 'single-item' : ''}`}>
          <span>영양제</span>
          {supplements.map((supplement, index) => (
            <div key={supplement.id} className="supplements-item">
              <input
                type="text"
                placeholder="supplements"
                value={supplement.name}
                onChange={e => handleSupplements(index, e)}
                required
              />
              {supplements.length > 1 && (
                <button onClick={() => handleRemoveSupplement(supplement.id)}>
                  <BsTrash size={'18px'} />
                </button>
              )}
            </div>
          ))}
          {(!supplementsValid ||
            supplements.length === 0 ||
            supplements.some(supplement => supplement.name.trim() === '')) && (
            <div className="errorMessageWrap">
              <span>영양제를 최소 1개 입력해주세요.</span>
            </div>
          )}
        </div>
      </form>
      {/* 영양제 추가 버튼  */}
      <button onClick={handleAddSupplement} className="add-supplements">
        + supplements
      </button>

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