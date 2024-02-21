import axios from 'axios';

export const getMyPage = async () => {
  //토큰 있어야 접근 가능
  const access = localStorage.getItem('access');
  const result = await axios.get('http://35.216.115.26:80/users/mypage');
  return result.data;
};
