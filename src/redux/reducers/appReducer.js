import openWeatherMapAPI from "../../api/openWeatherMapAPI";
import getDate from "../../utils/date";
import {selectImg} from "../../utils/background";

const SET_CITY_WEATHER = 'SET-CITY';
const CHANGE_BG = 'CHANGE-BG';
const INIT_APP = 'INIT-APP';
const DEFAULT_CITY = 'Minsk';

const initApp = () => ({type: INIT_APP});
const setCityWeatherInfo = (city, cityInfo, weatherInfo) => ({type: SET_CITY_WEATHER, city, cityInfo, weatherInfo});
const changeBg = (image) => ({type: CHANGE_BG, image});

const initialState = {
  city: null,
  cityInfo: null,
  weather: null,
  date: null,
  bgImg: null,
  isInit: false,
}

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_APP:
      return {
        ...state,
        date: getDate(),
        isInit: true
      }
    case SET_CITY_WEATHER:
      return {
        ...state,
        city: action.city,
        cityInfo: action.cityInfo,
        weather: action.weatherInfo
      };
    case CHANGE_BG:
      return {
        ...state,
        bgImg: action.image
      };
    default:
      return state;
  }
}

export const initializeApp = () => (dispatch) => {
  navigator.geolocation.getCurrentPosition(position => {
    const {latitude, longitude} = position.coords;
    if (!!latitude && !!longitude) {
      return openWeatherMapAPI.getUserCityCurrentWeatherData(latitude, longitude)
        .then(data => {
          const weatherInfo = {
            temperature: data.main,
            additional: data.weather[0],
            wind: data.wind
          };

          const image = selectImg(data.weather[0].description);

          dispatch(setCityWeatherInfo(data.name, data.sys, weatherInfo));
          dispatch(changeBg(image));
          dispatch(initApp());
        }).catch(error => {
          console.log(error);
        });
    } else {
      dispatch(getSearchCityCurrentWeatherData(DEFAULT_CITY));
      dispatch(initApp());
    }
  });
}

export const getSearchCityCurrentWeatherData = (city) => (dispatch) => {
  return openWeatherMapAPI.getSearchCityCurrentWeatherData(city)
    .then(data => {
      const weatherInfo = {
        temperature: data.main,
        additional: data.weather[0],
        wind: data.wind
      };

      const image = selectImg(data.weather[0].description);

      dispatch(setCityWeatherInfo(data.name, data.sys, weatherInfo));
      dispatch(changeBg(image));
    }).catch(error => {
      console.log(error);
    });
}

export default AppReducer;
