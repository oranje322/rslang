import React from 'react';
import classes from './EndGame.module.scss';
import { useHistory } from 'react-router-dom';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const EndGame = ({ reGame, statistics }) => {
    const history = useHistory();
    const { width, height } = useWindowSize();

    const backToGamesHandler = () => {
        history.push('/games');
    }

    return (
        <div className={classes.gameContainer}>
            <Confetti
                width={width}
                height={height}
            />
            <p> Вы освоили {statistics} cлов!</p>
            <p>Ура!</p>
            <div>
                <button onClick={reGame} className={classes.button}>Играть еще раз</button>
                <button onClick={backToGamesHandler} className={classes.button}>Назад к играм</button>
            </div>
        </div>
    )
}

export default EndGame;
