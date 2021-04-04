import React from 'react';
import classes from './GameWin.module.scss';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const GameWin = (props) => {
  const history = useHistory();
  const { width, height } = useWindowSize();

  const backToGamesHandler = () => {
    history.push('/games');
  }

  return (
    <div className={classes.screen}>
      <Confetti
        width={width}
        height={height}
      />
      <h3>Ура, вы прошли игру!</h3>
      <p>Набрано очков: {props.score}</p>
      <div className={classes.btnContainer}>
        <Button variant="outlined" onClick={backToGamesHandler}>Назад к играм</Button>
        <Button variant="outlined" onClick={props.playAgainHandler}>Сыграть еще раз</Button>
      </div>
    </div>
  )
}

export default GameWin;
