import axios from 'axios';

export const foodRecord = async (name, calories, carbs, protein, date) => {
  const access = localStorage.getItem('access');
  const result = await axios.post(
    'http://35.216.115.26:80/diet/record',
    {
      name,
      calories,
      carbs,
      protein,
      date,
    },
    {
      headers: {
        'X-ACCESS-TOKEN': access,
      },
    },
  );
  return result.data;
};
