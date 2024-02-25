import React, { useEffect, useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { AiFillPlusCircle } from "react-icons/ai";

import './Register.css';
import { useNavigate } from 'react-router-dom';
import { foodList } from '../../apis/foodList';
import { foodSelect } from '../../apis/foodSelect';
import Footer from '../Footer/Footer';

export default function Register() {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);

  const [selectedFoods, setSelectedFoods] = useState([]);

  const filteredItems = data.filter((item) => 
    item.desc_KOR.toLowerCase().includes(searchInput.toLowerCase()),
  )

  useEffect(() => {
    foodList().then((res) => {
      setData(res);
      setLoading(false);
      
    });
  }, []);

  if(loading) return <div className="loading-state">로딩중...</div>;

  const handleBackBtn = () => {
    navigate(-1);
  }

  const handleFoodSelect = (food) => {
    setSelectedFoods([...selectedFoods, food]); // Add selected food to the list
  };

  const handleRegisterBtn = async () => {
    if (selectedFoods.length > 0) {

      console.log(selectedFoods);
      console.log(selectedFoods[0].desc_KOR);
      const date = new Date().toISOString(); // 현재 날짜와 시간을 가져옵니다


      for(let i = 0; i < selectedFoods.length; i++) {
        await foodSelect(selectedFoods[i].desc_KOR, selectedFoods[i].nutr_CONT1, selectedFoods[i].nutr_CONT2, selectedFoods[i].nutr_CONT3, date);
      
      }
      alert('등록이 완료되었습니다! :)');
      navigate('/main');
    } else {
      alert("선택된 음식이 없습니다.");
    }
  };

  const handleOwnRegisterBtn = () => {
    navigate('/diet/record');
  }


  return (
    <div className='container'>
      <div className="banner">
        <button onClick={handleBackBtn} className='back-btn'>
          <GoArrowLeft />
        </button>
        <h3>식단 기록하기</h3>
      </div>
      <div className="search-box">
        <CiSearch />
        <input type="text" placeholder='무슨 음식을 드셨나요?' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
      </div>

      <div className="food-list">
        {filteredItems.map((food, index) => (
          <div key={index} className={`food food-${index + 1}`}>
            <div className="food-top">
              <h3>{food.desc_KOR}</h3>
              <AiFillPlusCircle className='plus-btn' onClick={() => handleFoodSelect(food)} />
            </div>
            <div className="nutrition-info">
              <span>탄수화물({food.nutr_CONT2}g)</span>
              <span>단백질({food.nutr_CONT3}g)</span>
              <span>열량({food.nutr_CONT1}kcal)</span>
            </div>
          </div>
        ))}
      </div>
      <div className="btn-box">
        <button onClick={handleRegisterBtn}>
          <span>등록하기</span>
        </button>
        <div className="link-view"></div>
        <button onClick={handleOwnRegisterBtn}>
          <span>직접 등록하기</span>
        </button>
    </div>
    </div>
  )
}
