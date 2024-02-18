import React, { useEffect, useState } from "react";
import './Main.css';
import { HiArrowRight } from "react-icons/hi2";
import { PiPillBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Main() {
  const navigate = useNavigate();

  const today = new Date();
  //년도
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const name = '새싹이';
  const supplementList = ['약1', '약2', '약3', '약4', '약5'];
  const pregnantWeek = 14;

  const formattedDate = `${year}년 ${month}월 
  ${day}일`;

  const [users, setUsers] = useState(null); //결과값
  const [loading, setLoading] = useState(false); //로딩 여부
  const [error, setError] = useState(null); //에러

  const fetchUsers = async () => {
    try {
      setUsers(null);
      setError(null);
      setLoading(true); //로딩 시작
      const response = await axios.get('https://jsonplaceholder.typicode.com/users/');
      setUsers(response.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect( () => {
    fetchUsers();
  }, [])


  if( loading ) return <div>로딩중...</div>
  if( error ) return <div>에러 발생!!</div>
  if( !users ) return null; //user 값 유효하지 않은 경우

  const onClickAnalysisBtn = () => {
    navigate("/diet/analysis");
  };

  const onClickRegisterNutritionBtn = () => {
    navigate("/diet/list");
  };

  const onClickSupplementsBtn = () => {
    navigate("/supplement");
  };
  return (
    <div className="container">
      <div id="date">
        <h3>{formattedDate}</h3>
      </div>
      <div className="d-dayBox">
        <div className="d-day">
          <div className="to-meet">
            <div id="name">{users[3].username} </div>
            <div className="">만나기까지</div>
          </div>
          
          <div className="d-day-date">179일</div>
          <span>(14주 3일째)</span>
        </div>
        <div className="baby-img"></div>
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
            <span>오늘 아직 안 먹은 영양제가 2개 있어요!</span>
          </div>
          <div className="check-list">
            <div className="pharm pharm-1">
              <div className="pharm-box">
                <PiPillBold className="pillImage" />
                <span>{supplementList[0]}</span>
              </div>
              <button>✔</button>
            </div>
            <div className="pharm pharm-2">
              <div className="pharm-box">
                <PiPillBold className="pillImage" />
                <span>{supplementList[1]}</span>
              </div>
              <button>✔</button>
            </div>
            <div className="pharm pharm-3">
              <div className="pharm-box">
                <PiPillBold className="pillImage" />
                <span>{supplementList[2]}</span>
              </div>
              <button>✔</button>
            </div>
            <div className="pharm pharm-4">
              <div className="pharm-box">
                <PiPillBold className="pillImage" />
                <span>{supplementList[3]}</span>
              </div>
              <button>✔</button>
            </div>
            <div className="pharm pharm-5">
              <div className="pharm-box">
                <PiPillBold className="pillImage" />
                <span>{supplementList[4]}</span>
              </div>
              <button>✔</button>
            </div>
          </div>
        </div>
      </div>
      <div className="tips-for-pregnants">
        <h3>임신 {pregnantWeek}주 Tips</h3>
      </div>
    </div>
  );
}