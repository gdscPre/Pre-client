import React, { useEffect, useState } from "react";
import './Main.css';
import { HiArrowRight } from "react-icons/hi2";
import { PiPillBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { getMainPage } from "../../apis/mainpage";

import { showSupplement } from '../../apis/showSupplement';
import { supplementCheck } from '../../apis/supplementCheck';
import Footer from "../Footer/Footer";
import * as FooterFunction from '../Footer/Footer.js';

const checkedImg = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbMDcVS%2FbtsFesDRFRa%2FG3PKdPPWFXIEak7lqHjjJ1%2Fimg.png';
const unCheckedImg = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdvuMH7%2FbtsFfbV7M7h%2Fz2arzmw2H32N69JtCXtLKK%2Fimg.png';

const activePill = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FHtGpH%2FbtsFjIdx183%2FrDBkUWGcDI6FVkN2cTQOJ1%2Fimg.png';
const unactivePill = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FHkaIH%2FbtsFiumlLe5%2FkOEEkUuRZj4Dfu7n0UUtH0%2Fimg.png';

const firstTrimester = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbbQRjk%2FbtsFgoHAx45%2F0LOiZIkDhxzgpKYXPdKP9K%2Fimg.jpg';
const secondTrimester = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbrq6FZ%2FbtsFhoAgvGF%2Fw0dVeq8IBzpPbdNczKbA40%2Fimg.jpg';
const thirdTrimester = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2gyOK%2FbtsFiqj5XzU%2FTyrypygGEAKiktaKh0hc31%2Fimg.jpg';



export default function Main() {
  const navigate = useNavigate();

  const today = new Date();

  //년도
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const [data, setData] = useState();
  const [supplementData, setSupplementData] = useState([]);
  const [loading, setLoading] = useState(true);
  const supplementList = ['약1', '약2', '약3', '약4', '약5'];

  const formattedDate = `${year}년 ${month}월 
  ${day}일`;
  const alldrunkText = "오늘 먹을 영양제를 다 드셨습니다! :)";
  let notDrunk = 0;

  useEffect(() => {
    getMainPage().then((res) => {
      setData(res);
      setLoading(false);
    });
    showSupplement().then((res) => {
      setSupplementData(res);
      
    });
  }, []);

  supplementData.forEach(element => {
    if(element._checked == false) notDrunk++;
  })


  if(loading) return <div className="loading-state">로딩중...</div>;




  const onClickAnalysisBtn = () => {
    navigate("/diet/analysis");
  };

  const onClickRegisterNutritionBtn = () => {
    navigate("/diet/list");
  };

  const onClickSupplementsBtn = () => {
    navigate("/supplement");
  };

  let pregnancyImgsrc = firstTrimester;
  if(data.week <= 13) {
    pregnancyImgsrc = firstTrimester;
  }
  else if (data.week > 14 && data.week <= 28) {
    pregnancyImgsrc = secondTrimester;
  } else {
    pregnancyImgsrc = thirdTrimester;
  }



  return (
    <div className="container">
      <div id="date">
        <h3>{formattedDate}</h3>
      </div>
      <div className="d-dayBox">
        <div className="d-day">
          <div className="to-meet">
            <div id="name">{data?.b_name} </div>
            <div className="">만나기까지</div>
          </div>
          
          <div className="d-day-date">{data?.d_day}일</div>
          <span>({data?.week}주 {data?.day}일째)</span>
        </div>
        <div className="baby-img">
          <img src={pregnancyImgsrc} alt="" />
        </div>
      </div>
      <div className="diet-analysis">
        <div className="analysis">
          <span>식단 분석</span>
          <button onClick={onClickAnalysisBtn}><HiArrowRight /></button>
        </div>
        <button onClick={onClickRegisterNutritionBtn} id="record-nutrition-btn">
          <span>식단 기록하기</span>
        </button>
      </div>

      <div className="nutritional-supplements">
        <div className="supplements-top">
          <span>영양제</span>
          <button onClick={onClickSupplementsBtn}><HiArrowRight /></button>
        </div>
        <div className="nutritional-status">
          <div className="status-remind">
            <span>{notDrunk === 0 ? alldrunkText : `오늘 아직 안 먹은 영양제가 ${notDrunk}개 있어요!`}</span>
          </div>
          <div className="check-list">
            {supplementData.map((supplement, index) => (
              <div key={index} className={'pharm'}>
                <div className="pharm-box">
                  <img src={supplement._checked ? activePill : unactivePill} className="pillImage" />             
                  <span className={supplement._checked ? "supplement-name active" : "supplement-name"}>{supplement.supplement_name}</span>
                </div>  
                <button>
                  <img src={supplement._checked ? checkedImg : unCheckedImg} alt="" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="tips-for-pregnants">
        <h3>임신 {data?.week}주 Tips</h3>
      </div>
      <Footer className="main"/>
    </div>
  );
}