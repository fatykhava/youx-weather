import day from '../assets/img/yasnoe-nebo.jpg';
import night from '../assets/img/night.jpg';
import cloudDay from '../assets/img/oblachnoe.jpg';
import cloudNight from '../assets/img/moon-clouds.jpg';
import rainDay from '../assets/img/rain.jpg';
import rainNight from '../assets/img/dozhd-noch.jpg';

const backgroundImages = {
  day: [
    {
      img: day,
      isCloud: false,
      isRain: false
    },
    {
      img: rainDay,
      isCloud: false,
      isRain: true
    },
    {
      img: rainDay,
      isCloud: true,
      isRain: true
    },
    {
      img: cloudDay,
      isCloud: true,
      isRain: false
    }
  ],
  night: [
    {
      img: night,
      isCloud: false,
      isRain: false
    },
    {
      img: rainNight,
      isCloud: false,
      isRain: true
    },
    {
      img: rainNight,
      isCloud: true,
      isRain: true
    },
    {
      img: cloudNight,
      isCloud: true,
      isRain: false
    }
  ]
};

export const selectImg = (description) => {
 const isCloud = description.includes('cloud');
 const isRain = description.includes('rain');
 const time = new Date();
 const hour = time.getHours();
 const partOfDay = (hour > 18 || hour < 6) ? 'night' : 'day';

 return backgroundImages[partOfDay].find(img => (img.isCloud === isCloud && img.isRain === isRain)).img;
}

export default backgroundImages;
