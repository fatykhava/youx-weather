import React from 'react';
import style from './Notification.module.scss'
import errorPic from '../../../assets/img/error.jpg';

const Notification = (props) => {
  return (
    <div className={style.wrapper}>
      <button onClick={props.closeNotification}>Close</button>
      <div>
        <img src={errorPic} alt='error'/>
      </div>
      <h2>{props.error.message}</h2>
    </div>
  );
}

export default Notification;
