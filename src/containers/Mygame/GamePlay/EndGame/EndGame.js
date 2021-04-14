import React from 'react';
import styles from '../../../Sprint/Sprint.module.scss';
import { useHistory } from 'react-router-dom';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import AudioComponent from '../../../Sprint/Audio'

import { useDispatch, useSelector } from 'react-redux';
import { setStatsThunk } from '../../../../redux/thunk/statsThunk'
const EndGame = ({ reGame, statistics, wrongAnswers, correctAnswers }) => {

    const history = useHistory();
    const { width, height } = useWindowSize();
    const dispatch = useDispatch();

    const backToGamesHandler = () => {
        history.push('/games');
    }
    dispatch(setStatsThunk(correctAnswers.length, wrongAnswers.length))
    return (
        <div className={styles.stats}>
            <Confetti
                width={width}
                height={height}
                numberOfPieces='50'
            />
            <h3>{`Результат игры: ${statistics} очков.`}</h3>
            <div className={styles.subtitle}>
                <p>Ошибся:</p>
                <p className={styles.wrongSprint}>{wrongAnswers.length}</p>
            </div>
            <div className={styles.answerBlock}>
                {
                    wrongAnswers.map((answer, index) => <div key={`wrong__${index}`} className={styles.answer}>
                        <AudioComponent audioLink={answer.audio} />
                        <p>{answer.word}</p>
                        <p>{answer.transcription}</p>
                        <p>{answer.correctTranslate}</p>
                    </div>)
                }
            </div>
            <div className={styles.subtitle}>
                <p>Ответил верно:</p>
                <p className={styles.correctSprint}>{correctAnswers.length}</p>
            </div>
            <div className={styles.answerBlock}>
                {
                    correctAnswers.map((answer, index) => <div key={`correct__${index}`} className={styles.answer}>
                        <AudioComponent audioLink={answer.audio} />
                        <p>{answer.word}</p>
                        <p>{answer.transcription}</p>
                        <p>{answer.correctTranslate}</p>
                    </div>)
                }
            </div>
            <div className={styles.statsButtons}>
                <button onClick={reGame}>Новая игра</button>
                <button onClick={backToGamesHandler}>Назад к играм</button>
            </div>
        </div>
    );
};

export default EndGame;
