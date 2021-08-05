const WEEK_DAIS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

const getDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  const dayOfTheWeek = today.getDay();

  return `${WEEK_DAIS[dayOfTheWeek]}, ${day} ${MONTHS[month]} ${year}`;
}

export default getDate;
