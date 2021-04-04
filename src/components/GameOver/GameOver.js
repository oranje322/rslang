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
      <p>К сожалению, вы проиграли</p>
      <div className={classes.btnContainer}>
        <button onClick={backToGamesHandler}>Назад к играм</button>
        <button onClick={props.tryAgainHandler}>Попробовать снова</button>
      </div>
    </div>
  )
}

export default GameOver;
