import React, { useState, useEffect } from 'react';
import AudiocallImg from '@assets/img/Audiocall.png';
import RightSound from '@assets/right.mp3';
import WrongSound from '@assets/wrong.mp3';
import styles from './Audiocall.module.scss';
import {connect} from 'react-redux';
import AnswerItem from './AnswerItem/AnswerItem';
import Scoreboard from './Scoreboard/scoreboard';

const GameField = (props) => { 
    const link = 'https://rslang-db.herokuapp.com/';
    const [counter, setCounter] = useState(0);
    const [answerCheck, setAnswerCheck] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const [results, setResults] = useState([]);
    const [state, setState] = useState(props.allWords)
    const audio = new Audio(link + state[counter].audio);
    const rightSoundPlay = new Audio(RightSound);
    const wrongSoundPlay = new Audio(WrongSound);

    const onAnswerClick = (wordId) => {
        if (!answerCheck) {
            const question = state[counter]; 
            if (question.word == wordId) {
                rightSoundPlay.play()
                setResults([...results, {[question.word]: 'right'}]);
                setAnswerCheck({[wordId]: 'success'})         
            } else {
                wrongSoundPlay.play()
                setResults([...results, {[question.word]: 'wrong'}]);
                setAnswerCheck({[wordId]: 'error'})
            }
        }  
    }

    const nextQuestion = () => {
            if(isCounretFinished()) {
                setIsFinished(true)
            }else {                
                setCounter(counter + 1)
                setAnswerCheck(null)
            }
    }

    // useEffect(() => {
    //     window.addEventListener('click', nextQuestion)

    //     return function cleanup() {
    //       window.removeEventListener('click', nextQuestion)
    //     }
    // })    

    const isCounretFinished = () => {
        return counter + 1 === state.length
    }

    const replayGame = () => {
        setCounter(0);
        setIsFinished(false)
        setAnswerCheck(null)
        setResults([])
    }

    const listen = () => {
        audio.play();
    };

    return (
        <div className={styles.rulesField}>
            {isFinished
                ? <Scoreboard replayGame={replayGame} results={results}/>
                : <div className={styles.playingField}>
                    <div onClick={()=>listen()} className={styles.questionCard}>
                        {answerCheck 
                        ?<div>
                            <img className={styles.gameImg} src={link+state[counter].image} alt={link+state.word}/>
                            <span>{state[counter].word}</span>
                        </div> 
                        :<div>
                            <img onChange={listen()} className={styles.gameImg} src={AudiocallImg} alt='AudiocallImg'/>
                            <span>Прослушать еще</span>
                        </div>}   
                        <span>{state[counter].transcription}</span>
                    </div>    
                    <div className={styles.gameAnswers}>
                        <ul> 
                            {state.map((item, index) => (
                                <AnswerItem 
                                    key={index}
                                    item={item}
                                    onAnswerClick={onAnswerClick}
                                    answerCheck={answerCheck ? answerCheck[item.word] : null}
                                />
                            ))}
                        </ul>
                    </div>
                    <div className={styles.buttonGameField}>
                        
                        {answerCheck &&<button onClick={nextQuestion}>Далее</button>}
                    </div>                    
                </div>
            }
            <button className={styles.closeGame} onClick={()=>props.returnToStart()} >X</button>
        </div>
    );
};

export default GameField;