import React from 'react';
import styles from '../../../Sprint/Sprint.module.scss';
import { useHistory } from 'react-router-dom';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'






const EndGame = ({ reGame, statistics }) => {

    const { score, correctAnswers, wrongAnswers } = useSelector(state => state.sprint);
    const dispatch = useDispatch();


    const history = useHistory();
    const { width, height } = useWindowSize();

    const backToGamesHandler = () => {
        history.push('/games');
    }

    const onClickRestart = () => {
        dispatch(loadWordsForSprint())
        dispatch(startSprint())
    }

    return (
        <div className={styles.stats}>
            <Confetti
                width={width}
                height={height}
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
                <button onClick={onClickRestart}>Новая игра</button>
                {/*<button>Статистика</button>*/}
            </div>
        </div>
    );
};

export default EndGame;
