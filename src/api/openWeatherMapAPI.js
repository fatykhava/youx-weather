import * as axios from 'axios';

let instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

const openWeatherMapAPI = {
  getSearchCityCurrentWeatherData(city) {
    return instance.get(`weather?q=${city}&lang=en&appid=7855be89de72b6ea0540164aea4c0922&units=metric`).then(response => response.data);
  },
  getUserCityCurrentWeatherData(lat, lon) {
    return instance.get(`weather?lat=${lat}&lon=${lon}&lang=en&appid=7855be89de72b6ea0540164aea4c0922&units=metric`).then(response => response.data);
  }
};

export default openWeatherMapAPI;
