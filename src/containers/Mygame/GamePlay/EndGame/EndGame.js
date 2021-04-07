import React from 'react';
import classes from './EndGame.module.scss';
import { useHistory } from 'react-router-dom';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
// import { useDispatch, useSelector } from 'react-redux';
// import { loadWordsForSprint, startSprint } from '../../redux/thunk/sprintThunk';
// import AudioComponent from './Audio';

// const EndGame = ({ reGame, statistics }) => {
//     const history = useHistory();
//     const { width, height } = useWindowSize();

//     const backToGamesHandler = () => {
//         history.push('/games');
//     }

//     return (
//         <div className={classes.gameContainer}>
//             <Confetti
//                 width={width}
//                 height={height}
//             />
//             {/* <p> Вы освоили {statistics} cлов!</p>
//             <p>Ура!</p>
//             <div>
//                 <button onClick={reGame} className={classes.button}>Играть еще раз</button>
//                 <button onClick={backToGamesHandler} className={classes.button}>Назад к играм</button>
//             </div> */}

//         </div>
//     )
// }





const EndGame = ({ reGame, statistics }) => {

    const { score, correctAnswers, wrongAnswers } = useSelector(state => state.sprint);
    const dispatch = useDispatch();

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
            <h3>{`Результат игры: ${score} очков.`}</h3>
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
