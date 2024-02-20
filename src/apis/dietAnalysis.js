import axios from "axios";

export const dietAnalysis = async () => {
  const access = localStorage.getItem('access');
  const result = await axios.get('http://35.216.115.26:80/diet/analysis', {
    headers: {
      "X-ACCESS-TOKEN": access,

    },
  });
  return result.data;

}