import React, { useEffect, useState } from 'react';
import styles from './Scoreboard.module.scss';
import PercentageResult from '../percentageResult/percentageResult';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import AudioComponent from '../../Sprint/Audio';
import { useDispatch, useSelector } from 'react-redux';
import { setStatsThunk } from '../../../redux/thunk/statsThunk';

const Scoreboard = (props) => {  
    const [otherScoreboard, setOtherScoreboard] = useState(false);
    const { width, height } = useWindowSize();
    const dispatch = useDispatch();  
    dispatch(setStatsThunk(props.correctAnswers.length, props.wrongAnswers.length)) 

	return (
        <div className={styles.scoreboardField}>
            {props.wrongAnswers.length<=1
            ?<div><h3>Отличный результат</h3>
                 <Confetti
                 width={width}
                height={height}
                numberOfPieces='50'/>
            </div>
            :props.wrongAnswers.length>1 && props.wrongAnswers.length<=4
            ?<h3>Хороший результат</h3>
            :<h3>Нужно еще подучить</h3>}
            <p>{props.correctAnswers.length} слов изучено </p>
            <p>{props.wrongAnswers.length} - не изучено</p>
            {otherScoreboard
            ?<div>
                <div>
                    <span onClick={()=>setOtherScoreboard(false)}>○</span>
                    <span onClick={()=>setOtherScoreboard(true)}>●</span>
                </div>
                    <div className={styles.stats}>
                        <h3>{`Результат игры: ${props.statistics} очков.`}</h3>
                        <div className={styles.subtitle}>
                            <p>Ошибся:</p>
                            <p className={styles.wrongSprint}>{props.wrongAnswers.length}</p>
                        </div>
                        <div className={styles.answerBlock}>
                            {
                                props.wrongAnswers.map((answer, index) => <div key={`wrong__${index}`} className={styles.answer}>
                                    <AudioComponent audioLink={answer.audio} />
                                    <p>{answer.word}</p>
                                    <p>{answer.transcription}</p>
                                    <p>{answer.correctTranslate}</p>
                                </div>)
                            }
                        </div>
                        <div className={styles.subtitle}>
                            <p>Ответил верно:</p>
                            <p className={styles.correctSprint}>{props.correctAnswers.length}</p>
                        </div>
                        <div className={styles.answerBlock}>
                            {
                                props.correctAnswers.map((answer, index) => <div key={`correct__${index}`} className={styles.answer}>
                                    <AudioComponent audioLink={answer.audio} />
                                    <p>{answer.word}</p>
                                    <p>{answer.transcription}</p>
                                    <p>{answer.correctTranslate}</p>
                                </div>)
                            }
                        </div>
                        <div className={styles.statsButtons}>
                            <button onClick={()=>props.replayGame()}>Новая игра</button>
                        </div>
                    </div>
            </div>            
            : <div>           
                <div>
                    <span onClick={()=>setOtherScoreboard(false)}>●</span>
                    <span onClick={()=>setOtherScoreboard(true)}>○</span>
                </div> 
                <div className={styles.scoreboardResults}>
                    <div className={styles.scoreboardDiagram}>
                        <PercentageResult correctAnswers={props.correctAnswers.length} wrongAnswers={props.wrongAnswers.length}/>
                    </div>
                    <button className={styles.buttonReplayGame} onClick={()=>props.replayGame()} >Играть заново</button>
                 </div>                 
            </div>} 
        </div>
    )
};

export default Scoreboard;