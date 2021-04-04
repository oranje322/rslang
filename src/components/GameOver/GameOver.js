import React from 'react';
import classes from './GameOver.module.scss';
import { Button } from '@material-ui/core';
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
        <Button variant="outlined" onClick={backToGamesHandler}>Назад к играм</Button>
        <Button variant="outlined" onClick={props.tryAgainHandler}>Попробовать снова</Button>
      </div>
    </div>
  )
}

export default GameOver;
