//patch

import axios from 'axios';

export const modify = async (week, day, b_name) => {
  const access = localStorage.getItem('access');
  const result = await axios.patch(
    'http://35.216.115.26:80/users/modify',
    {
      week,
      day,
      b_name,
    },
    {
      headers: {
        'X-ACCESS-TOKEN': access,
      },
    },
  );
  return result.data;
};
