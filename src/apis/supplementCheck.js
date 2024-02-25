import axios from "axios";

export const supplementCheck = async (supplement_id, date, is_checked) => {
  const access = localStorage.getItem('access');

  const result = await axios.post('http://35.216.115.26:80/main/check', {
    supplement_id,
    date,
    is_checked,
  },
  {
    headers: {
      "X-ACCESS-TOKEN": access,

    }
  },
  );
  return result.data;
};