import React from 'react';
import classes from './GameOver.module.scss';
import { useHistory } from 'react-router-dom';

const GameOver = (props) => {
  const history = useHistory();

  const backToGamesHandler = () => {
    history.push('/games');
  }

  return (
    <div className={classes.screen}>
      <h3>К сожалению, вы проиграли</h3>
      <div className={classes.btnContainer}>
        <button className={classes.btn} onClick={backToGamesHandler}>Назад к играм</button>
        <button className={classes.btn} onClick={props.tryAgainHandler}>Попробовать снова</button>
      </div>
    </div>
  )
}

export default GameOver;
