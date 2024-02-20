import React, { useEffect, useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { PieChart } from 'react-minimal-pie-chart';
import { dietAnalysis } from '../../apis/dietAnalysis';

import './Analysis.css';


export default function Analysis() {
  const navigate = useNavigate();
  const today = new Date();
  //년도
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const formattedDate = `${year}년 ${month}월 
  ${day}일`;
  const [data, setData] = useState([]);

  const [sumKcal, setSumKcal] = useState(0);
  const [sumCarbs, setSumCarbs] = useState(0);
  const [sumProtein, setSumProtein] = useState(0);
  
  //추가 수정 예정 -> 임신 초중기, 후기 별로 다름 (적정 칼로리/탄수화물/단백질)
  const appropriateKcal = 2340;
  const appropriateCarbohydrate = 175;
  const appropriateProtein = 15;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dietAnalysis().then((res) => {
      setSumKcal(res?.sum_calories);
      setSumCarbs(res?.sum_carbs);
      setSumProtein(res?.sum_protein);
      setData(res?.food_list);
      setLoading(false);
    });
  }, []);
  function getDayOfWeek(day) {
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
    const dayOfWeek = week[day.getDay()];
    return dayOfWeek;
  }

  // 칼로리 상태 설정
  let kcalState = '';
  let kcalStateNum = 0;
  if (sumKcal > appropriateKcal) {
    kcalState = '과잉';
    kcalStateNum = sumKcal - appropriateKcal;
  } else if (sumKcal < appropriateKcal) {
    kcalState =  '부족';
    kcalStateNum = appropriateKcal - sumKcal;
  } else {
    kcalState = '적당';
  }

  // 탄수화물 상태 설정
  let carbState = '';
  let carbStateNum = 0;
  if (sumCarbs > appropriateCarbohydrate) {
    carbState = '과잉';
    carbStateNum = sumCarbs - appropriateCarbohydrate;
  } else if (sumCarbs < appropriateCarbohydrate) {
    carbState =  '부족';
    carbStateNum = appropriateCarbohydrate - sumCarbs;
  } else {
    carbState = '적당';
  }

    // 단백질 상태 설정
    let proteinState = '';
    let proteinStateNum = 0;
    if (sumProtein > appropriateProtein) {
      proteinState = '과잉';
      proteinStateNum = sumProtein - appropriateProtein;
    } else if (sumProtein < appropriateProtein) {
      proteinState =  '부족';
      proteinStateNum = appropriateProtein - sumProtein;
    } else {
      proteinState = '적당';
    }

  const handleBackBtn = () => {
    navigate(-1);
  }

  if(loading) return <div className="loading-state">로딩중...</div>;

  return (
    <div className='container'>
      <div className="banner">
        <button onClick={handleBackBtn} className='back-btn'>
          <GoArrowLeft />
        </button>
        <h3>식단 분석</h3>
      </div>

      <h4 className='date-selected'>{formattedDate}</h4>
      <div className="calendar-days">
        <button className='btn-calendar'>
          <IoIosArrowBack />
        </button>
        <div className="day-box">
          <h2 className='week'>{getDayOfWeek(new Date(year, month, day - 4))}</h2>
          <div className="day">{day - 3}</div>
        </div>
        <div className="day-box">
          <h2 className='week'>{getDayOfWeek(new Date(year, month, day - 3))}</h2>
          <div className="day">{day - 2}</div>
        </div>
        <div className="day-box">
          <h2 className='week'>{getDayOfWeek(new Date(year, month, day - 2))}</h2>
          <div className="day">{day - 1}</div>
        </div>
        <div className="day-box">
          <h2 className='week'>{getDayOfWeek(new Date(year, month, day - 1))}</h2>
          <div className="day selected">{day}</div>
        </div>
        <div className="day-box">
          <h2 className='week'>{getDayOfWeek(new Date(year, month, day))}</h2>
          <div className="day">{day + 1}</div>
        </div>
        <div className="day-box">
          <h2 className='week'>{getDayOfWeek(new Date(year, month, day + 1))}</h2>
          <div className="day">{day + 2}</div>
        </div>
        <div className="day-box">
          <h2 className='week'>{getDayOfWeek(new Date(year, month, day + 2))}</h2>
          <div className="day">{day + 3}</div>
        </div>
        <button className='btn-calendar'>
          <IoIosArrowForward />
        </button>
      </div>

      <div className="analysis-box">
        <div className="kcal-box">
          <div className="box-left">
            <div className="box-top">
              <h3>열량</h3>
              <div className="nutri-state">{kcalState}</div>
            </div>
            <span>{kcalStateNum} kcal 를<br/>{kcalState === '과잉' ? '더' : '적게'} 섭취하셨습니다.</span>
          </div>
          <PieChart className='piechart'
            data={[
              { title: 'One', value: sumKcal, color: '#FFA8B9' },
              { title: 'Two', value: appropriateKcal, color: '#FFECEF' },
            ]}
          />
        </div>
        <div className="carbohydrate-box">
          <div className="box-left">
            <div className="box-top">
              <h3>탄수화물</h3>
              <div className="nutri-state">{carbState}</div>
            </div>
            <span>{carbStateNum} g 을<br/>{carbState === '과잉' ? '더' : '적게'} 섭취하셨습니다.</span>
          </div>
          <PieChart className='piechart'
            data={[
              { title: 'One', value: sumCarbs, color: '#FFA8B9' },
              { title: 'Two', value: appropriateCarbohydrate, color: '#FFECEF' },
            ]}
          />
        </div>
        <div className="protein-box">
          <div className="box-left">
            <div className="box-top">
              <h3>단백질</h3>
              <div className="nutri-state">{proteinState}</div>
            </div>
            <span>{proteinStateNum} g 을<br/>{proteinState === '과잉' ? '더' : '적게'} 섭취하셨습니다.</span>
          </div>
          
          <PieChart className='piechart'
            data={[
              { title: 'One', value: sumProtein, color: '#FFA8B9' },
              { title: 'Two', value: appropriateProtein, color: '#FFECEF' },
            ]}
          />
        </div>
      </div>
      <div id="line"></div>
      <div className="diet-list">
        <div className="diet-banner">
          <span className='row'>이름</span>
          <span className='row'>탄수화물</span>
          <span className='row'>단백질</span>
          <span className='row'>열량</span>
        </div>
        {data.map((food, index) => (
          <div key={index} className={`food-box food-${index + 1}`}>
            <span className='row food-name'>{food.name}</span>
            <span className='row'>{food.carbs}g</span>
            <span className='row'>{food.protein}g</span>
            <span className='row'>{food.calories}kcal</span>
          </div>
        ))}
        

      </div>
    </div>
  )
}
