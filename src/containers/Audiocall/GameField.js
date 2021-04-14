import React, { useState, useEffect } from 'react';
import AudiocallImg from '@assets/img/Audiocall.png';
import styles from './Audiocall.module.scss';
import AnswerItem from './AnswerItem/AnswerItem';
import Scoreboard from './Scoreboard/scoreboard';
import { wrongSound, correctSound } from '../../utils/constants';

const GameField = (props) => { 
    const link = 'https://rslang-db.herokuapp.com/';
    const [counter, setCounter] = useState(0);
    const [answerCheck, setAnswerCheck] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const [results, setResults] = useState([]);
    const [state, setState] = useState([]);
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [statistics, setStatistics] = useState(10);
    const numArr = props.randomNumArr;

	const randomiser = (arr) => Math.floor(Math.random() * arr.length);

    const newLevelWords = (Words) => {
		let random;
        while (state.length < 10) {
            random = Words[randomiser(Words)];
            if (state.some(word => word === random)) continue;			
			state.push(random);
        }		
    }
    newLevelWords(props.words);
        
    const onAnswerClick = (wordId) => {
        if (!answerCheck) {
            const question = state[numArr[counter]]; 
            if (question.word == wordId) {
                correctSound.play()
                setResults([...results, {[question.word]: 'right'}]);
                setAnswerCheck({[wordId]: 'success'})  
                setCorrectAnswers([...correctAnswers, question])       
            } else {
                wrongSound.play()
                setResults([...results, {[question.word]: 'wrong'}]);
                setAnswerCheck({[wordId]: 'error'})
                setWrongAnswers([...wrongAnswers, question])
                setStatistics(statistics - 1)
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
        return counter+1 === state.length
    }

    const replayGame = () => {
        setCounter(0);
        setIsFinished(false)
        setAnswerCheck(null)
        setResults([])
        setWrongAnswers([])
        setCorrectAnswers([])
    }

    const audio = new Audio(link + state[numArr[counter]].audio);
    const listen = () => {
        audio.play();
    };

    return (
        <div className={styles.rulesField}>
            {isFinished
                ? <Scoreboard replayGame={replayGame} 
                results={results} 
                wrongAnswers={wrongAnswers} 
                correctAnswers={correctAnswers}
                statistics={statistics}/>
                : <div className={styles.playingField}>
                    <div onClick={()=>listen()} className={styles.questionCard}>
                        {answerCheck 
                        ?<div>
                            <img className={styles.gameImg} src={link+state[numArr[counter]].image} alt={link+state.word}/>
                            <span>{state[numArr[counter]].word}</span>
                        </div> 
                        :<div>
                            <img onChange={listen()} className={styles.gameImg} src={AudiocallImg} alt='AudiocallImg'/>
                            <span>Прослушать еще</span>
                        </div>}   
                        <span>{state[numArr[counter]].transcription}</span>
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
            <button className={styles.closeGame} onClick={()=>props.returnToStart()}>&#9664;</button>
        </div>
    );
};

export default GameField;