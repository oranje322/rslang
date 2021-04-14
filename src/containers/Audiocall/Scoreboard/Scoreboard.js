import React, { useEffect, useState } from 'react';
import styles from './Scoreboard.module.scss';
import PercentageResult from '../percentageResult/percentageResult';
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import AudioComponent from '../../Sprint/Audio'

const Scoreboard = (props) => {  
    const [otherScoreboard, setOtherScoreboard] = useState(false);
    const { width, height } = useWindowSize();                        
    const [count, setCount] = useState({
        rightAnsw: 0,
        wrongAnsw: 0
    });    

    let first = 0;
    let second = 0;

    useEffect(() => {
        setCount({
            rightAnsw: first,
            wrongAnsw: second
        });
    }, []);

	return (
        <div className={styles.scoreboardField}>
            {count.wrongAnsw<=1
            ?<div><h3>Отличный результат</h3>
                 <Confetti
                 width={width}
                height={height}
                numberOfPieces='50'/>
            </div>
            :count.wrongAnsw>1 && count.wrongAnsw<=4
            ?<h3>Хороший результат</h3>
            :<h3>Нужно еще подучить</h3>}
            <p>{count.rightAnsw} слов изучено </p>
            <p>{count.wrongAnsw} - не изучено</p>
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
                        <PercentageResult count={count}/>
                    </div>
                    <div className={styles.scoreboardAnswers}>                
                        <ul>
                            {props.results.map((result,index)=>{ 
                                Object.values(result).join(' ') === 'right'
                                ? first += 1
                                : second += 1
                                return ( <li key={index} >  
                                {Object.keys(result).join(' ')} - {Object.values(result).join(' ')}
                                </li>  
                            )})}                    
                        </ul>
                    </div>                    
                 </div>
                 <button className={styles.buttonReplayGame} onClick={()=>props.replayGame()} >Играть заново</button>
            </div>} 
        </div>
    )
};

export default Scoreboard;