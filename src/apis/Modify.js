//patch

import axios from 'axios';

export const modifyInfo = async (b_name, week, day) => {
  const access = localStorage.getItem('access');
  const result = await axios.patch(
    'http://35.216.115.26:80/users/modify',
    {
      b_name,
      week,
      day
    },
    {
      headers: {
        'X-ACCESS-TOKEN': access,
      },
    },
  );
  return result.data;
};