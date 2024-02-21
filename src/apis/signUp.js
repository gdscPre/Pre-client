import axios from "axios";

export const signUp = async (email, password, name, week, day, b_name, supplements) => {
  const result = await axios.post('http://35.216.115.26:80/users/join', {
    email,
    password,
    name,
    week,
    day,
    b_name,
    supplements,
  });
  return result.data;
};