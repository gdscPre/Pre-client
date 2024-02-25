import React from 'react'
import './Footer.css';
import { useNavigate } from 'react-router-dom';

const caution_1 = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrCSUW%2FbtsFffjPqmS%2FtBsqbtXQOGpezk04cKNzx1%2Fimg.png';
const caution_2 = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FnCMU2%2FbtsFeTaejJa%2FjdS4tjwcpemVBIq5rUu8zK%2Fimg.png';
const supple_1 = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FrFiiu%2FbtsFjUEYe1o%2FLDDAjIvIiklin9KKccgAsK%2Fimg.png';
const supple_2 = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F4OekC%2FbtsFjX2LMZS%2FHyIOaPG4Ft3YdiUbp4AcN0%2Fimg.png';
const main_1 = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FtS2TI%2FbtsFefxTn63%2FymNloBaFW9cQBb8O4AnDe0%2Fimg.png';
const main_2 = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbN331h%2FbtsFjIkh6Ez%2FYcF9URwlnjtFGOBbVQuAlK%2Fimg.png';
const meal_1 = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FkUqqS%2FbtsFesxbyl5%2FKKtR8pH2Y8ymE4OiUJkDR1%2Fimg.png';
const meal_2 = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Ft0JRh%2FbtsFinOexdV%2Fcq2FvmcrkjNq6u7pLlzbhK%2Fimg.png';
const mypage_1 = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Flwtsr%2FbtsFiOZipl7%2FB2wCv5RdS42hATlGJBpHbK%2Fimg.png';
const mypage_2 = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIEHOl%2FbtsFgLifJxl%2F9fJONrhgHGz5soIHAaVoe0%2Fimg.png';


export default function Footer() {
  const navigate = useNavigate();

  const handleCaution = () => {
    navigate("/tip");
    document.querySelector('.caution').src = caution_2;
    
  }

  const handleSupple = () => {
    navigate('/supplement');
  }
  const handleMain = () => {
    navigate('/main');
  }


  const handleMeal = () => {
    navigate('/diet/analysis');
  }

  const handleMypage = () => {
    navigate('/users/mypage');
  }
  return (
    <div className='footer-box'>
      <div onClick={handleCaution} >
        <img className='foot-menu caution' src={caution_1}/>
      </div>
      <div onClick={handleSupple}>
        <img className='foot-menu supple' src={supple_1}/>
      </div>
      <div onClick={handleMain}>
        <img className='foot-menu mains' src={main_1}/>
      </div>
      <div onClick={handleMeal}>
        <img className='foot-menu meal' src={meal_1}/>
      </div>
      <div onClick={handleMypage}>
        <img className='foot-menu my-page' src={mypage_1}/>
      </div>
    </div>
  )
}
