import axios from "axios";

export const foodList = async () => {
  const access = localStorage.getItem('access');
  const result = await axios.get('http://35.216.115.26:80/diet/list', {
    headers: {
      "X-ACCESS-TOKEN": access,

    },
  });
  return result.data;

}