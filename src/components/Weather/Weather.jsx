import React, {useEffect} from 'react';
import SearchInput from '../common/SearchInput/SearchInput';
import {connect} from 'react-redux';
import {getSearchCityCurrentWeatherData, initializeApp} from "../../redux/reducers/appReducer";
import {getBgImg, getCity, getCityInfo, getDate, getIsInit, getWeather} from "../../redux/selectors/appSelectors";
import style from './Weather.module.scss';

const Weather = (props) => {
  useEffect(() => {
      props.initializeApp();
  }, [])

  return (
    <div className={style.wrapper} style={{backgroundImage: `url(${props.bgImg})`}}>
      {
        props.isInit &&
        <div className={style.container}>
          <div className={style.content}>
            <h1>{props.city}, {props.cityInfo?.country}</h1>
            <h2>{props.date}</h2>
            <i className={`weather-icon owf owf-${props.weather.additional.id} ${style.owf}`}></i>
            <p>{props.weather.additional.description}</p>
            <p>{Math.round(props.weather.temperature.temp)} °C</p>
            <p>Humidity: {props.weather.temperature.humidity} %</p>
            <p>Wind: {props.weather.wind.speed} km/h</p>
          </div>
          <SearchInput inputValue={props.city} getData={props.getSearchCityCurrentWeatherData}/>
        </div>
      }
    </div>);
}

const mapStateToProps = (state) => ({
  city: getCity(state),
  cityInfo: getCityInfo(state),
  weather: getWeather(state),
  date: getDate(state),
  isInit: getIsInit(state),
  bgImg: getBgImg(state),
})

export default connect(mapStateToProps, {initializeApp, getSearchCityCurrentWeatherData})(Weather);
