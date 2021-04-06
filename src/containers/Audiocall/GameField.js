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

    const isCounretFinished = () => {
        return counter + 1 === state.length
    }

    const replayGame = () => {
        setCounter(0);
        setIsFinished(false)
        setAnswerCheck(null)
        setResults([])
    }

    const audio = new Audio(link + state[counter].audio);
    const rightSoundPlay = new Audio(RightSound);
    const wrongSoundPlay = new Audio(WrongSound);
    const listen = () => {
        audio.play();
    };

    return (
        <div className={styles.rulesField}>
            {isFinished
                ? <Scoreboard replayGame={replayGame} results={results}/>
                : <div>
                    {answerCheck 
                    ?<div>
                        <img className={styles.gameImg} src={link+state[counter].image} alt={link+state.word}/>
                        <p>{state[counter].word}</p>
                    </div> 
                    :<img onClick={()=>listen()} onChange={listen()} className={styles.gameImg} src={AudiocallImg} alt='AudiocallImg'/>}
                    <p>{state[counter].transcription}</p>
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
                    <button onClick={()=>props.returnToStart()} >Назад</button>
                    {answerCheck &&<button onClick={nextQuestion}>Далее</button>}                    
                </div>
            }

        </div>
    );
};

export default GameField;