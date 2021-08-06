import React, {useEffect, useState} from 'react';
import SearchInput from '../common/SearchInput/SearchInput';
import style from './Weather.module.scss';
import openWeatherMapAPI from "../../api/openWeatherMapAPI";
import {selectImg} from "../../utils/background";
import getDate from "../../utils/date";

const Weather = (props) => {
  let [city, setCity] = useState('Minsk');
  let [weatherInfo, setWeatherInfo] = useState({
    cityInfo: null,
    weather: null,
    date: null,
    bgImg: null,
  });
  let [isInit, setIsInit] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      if (!!latitude && !!longitude) {
        return getWeatherDataByCoordinate(latitude, longitude);
      } else {
        return getWeatherDataByCity(city);
      }
    });
  }, [])

  useEffect(() => {
    return getWeatherDataByCity(city);
  }, [city])

  const getWeatherDataByCity = (city) => {
    return openWeatherMapAPI.getSearchCityCurrentWeatherData(city)
      .then(data => {
        processWeatherData(data);
        setIsInit(true);
      }).catch(error => {
      alert('This city wasn\'t be found');
    });
  }

  const getWeatherDataByCoordinate = (latitude, longitude) => {
    return openWeatherMapAPI.getUserCityCurrentWeatherData(latitude, longitude)
      .then(data => {
        processWeatherData(data);
        setIsInit(true);
      }).catch(error => {
      alert('This city wasn\'t be found');
    });
  }

  const processWeatherData = (data) => {
    const image = selectImg(data.weather[0].description);
    const updatedWeatherInfo = {
      cityInfo: data.sys,
      weather: {
        temperature: data.main,
        additional: data.weather[0],
        wind: data.wind
      },
      date: getDate(),
      bgImg: image,
    };

    setCity(data.name);
    setWeatherInfo(updatedWeatherInfo);
    return true;
  }

  const setCityValue = (cityValue) => {
    setCity(cityValue);
  }

  return (
    <div className={style.wrapper} style={{backgroundImage: `url(${weatherInfo.bgImg})`}}>
      {
        isInit &&
        <div className={style.container}>
          <div className={style.content}>
            <h1>{city}, {weatherInfo.cityInfo?.country}</h1>
            <h2>{weatherInfo.date}</h2>
            <i className={`weather-icon owf owf-${weatherInfo.weather.additional.id} ${style.owf}`}></i>
            <p>{weatherInfo.weather.additional.description}</p>
            <p>{Math.round(weatherInfo.weather.temperature.temp)} °C</p>
            <p>Humidity: {weatherInfo.weather.temperature.humidity} %</p>
            <p>Wind: {weatherInfo.weather.wind.speed} km/h</p>
          </div>
          <SearchInput inputValue={city} getData={setCityValue}/>
        </div>
      }
    </div>);
}

export default Weather;
