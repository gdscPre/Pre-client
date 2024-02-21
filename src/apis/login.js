import axios from 'axios';

export const login = async (email, password) => {
  const result = await axios.post('http://35.216.115.26:80/users/login', { email, password });
  return result.data;
};
