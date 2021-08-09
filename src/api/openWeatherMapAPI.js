import * as axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_OPEN_WEATHER_MAP_API_URL,
});

const openWeatherMapAPI = {
  getSearchCityCurrentWeatherData(city) {
    return instance.get(`weather?q=${city}&lang=en&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_ID}&units=metric`).then(response => response.data);
  },
  getUserCityCurrentWeatherData(lat, lon) {
    return instance.get(`weather?lat=${lat}&lon=${lon}&lang=en&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_ID}&units=metric`).then(response => response.data);
  }
};

export default openWeatherMapAPI;
