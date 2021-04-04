import React, { useState } from 'react';
import AudiocallImg from '@assets/img/Audiocall.png';
import styles from './Audiocall.module.scss';
import {connect} from 'react-redux';
import AnswerItem from './AnswerItem/AnswerItem';
import Scoreboard from './Scoreboard/scoreboard';

const GameField = (props) => {       
    // {
    //     audio: '',  //вопрос
    //     wordTranslate: '',  //ответ
    //     words: '',  //при правильном ответе, показать            
    //     image: ''  //при правильном ответе, показать
    // }
    const [state, setState] = useState([
        {
            audio: "files/01_0011.mp3",
            audioExample: "files/01_0011_example.mp3",
            audioMeaning: "files/01_0011_meaning.mp3",
            group: 0,
            image: "files/01_0011.jpg",
            page: 0,
            textExample: "The woman <b>enjoys</b> riding her bicycle.",
            textExampleTranslate: "Женщина любит кататься на велосипеде",
            textMeaning: "To <i>enjoy</i> is to like something.",
            textMeaningTranslate: "Наслаждаться значит любить что-то",
            transcription: "[indʒɔ́i]",
            word: "enjoy",
            wordTranslate: "наслаждаться",
            _id: "5e9f5ee35eb9e72bc21af4aa",
        },
        {
            audio: "files/01_0002.mp3",
            audioExample: "files/01_0002_example.mp3",
            audioMeaning: "files/01_0002_meaning.mp3",
            group: 0,
            image: "files/01_0002.jpg",
            page: 0,
            textExample: "A person should not drive a car after he or she has been drinking <b>alcohol</b>.",
            textExampleTranslate: "Человек не должен водить машину после того, как он выпил алкоголь",
            textMeaning: "<i>Alcohol</i> is a type of drink that can make people drunk.",
            textMeaningTranslate: "Алкоголь - это тип напитка, который может сделать людей пьяными",
            transcription: "[ǽlkəhɔ̀ːl]",
            word: "alcohol",
            wordTranslate: "алкоголь",
            _id: "5e9f5ee35eb9e72bc21af4a0",
        },
        {
            audio: "files/01_0012.mp3",
            audioExample: "files/01_0012_example.mp3",
            audioMeaning: "files/01_0012_meaning.mp3", 
            group: 0,
            image: "files/01_0012.jpg",
            page: 0,
            textExample: "I will <b>invite</b> my friends to my birthday party.",
            textExampleTranslate: "Я приглашаю своих друзей на мой день рождения",
            textMeaning: "To <i>invite</i> is to ask someone to come to a place or event.",
            textMeaningTranslate: "Пригласить - это попросить кого-нибудь прийти на место или событие",
            transcription: "[inváit]",
            word: "invite",
            wordTranslate: "пригласить",
            _id: "5e9f5ee35eb9e72bc21af4ab",
        },
        {
            audio: "files/01_0013.mp3",
            audioExample: "files/01_0013_example.mp3",
            audioMeaning: "files/01_0013_meaning.mp3",
            group: 0,
            image: "files/01_0013.jpg",
            page: 0,
            textExample: "I <b>love</b> my family very much.",
            textExampleTranslate: "Я очень люблю свою семью",
            textMeaning: "To <i>love</i> is to like something or someone a lot.",
            textMeaningTranslate: "Любить значит любить что-то или кого-то много",
            transcription: "[lʌv]",
            word: "love",
            wordTranslate: "любовь",
            _id: "5e9f5ee35eb9e72bc21af4ae",
        },
        {
            audio: "files/01_0019.mp3",
            audioExample: "files/01_0019_example.mp3",
            audioMeaning: "files/01_0019_meaning.mp3",
            group: 0,
            image: "files/01_0019.jpg",
            page: 0,
            textExample: "What are you doing next <b>week</b>?",
            textExampleTranslate: "Что ты делаешь на следующей неделе?",
            textMeaning: "A <i>week</i> is a period of time that is seven days long.",
            textMeaningTranslate: "Неделя - это период времени, который длится семь дней",
            transcription: "[wiːk]",
            word: "week",
            wordTranslate: "неделя",
            _id: "5e9f5ee35eb9e72bc21af4b3",
        },
        {
            audio: "files/01_0001.mp3",
            audioExample: "files/01_0001_example.mp3",
            audioMeaning: "files/01_0001_meaning.mp3",
            group: 0,
            image: "files/01_0001.jpg",
            page: 0,
            textExample: "The students <b>agree</b> they have too much homework.",
            textExampleTranslate: "Студенты согласны, что у них слишком много домашней работы",
            textMeaning: "To <i>agree</i> is to have the same opinion or belief as another person.",
            textMeaningTranslate: "Согласиться - значит иметь то же мнение или убеждение, что и другой человек",
            transcription: "[əgríː]",
            word: "agree",
            wordTranslate: "согласна",
            _id: "5e9f5ee35eb9e72bc21af4a1",
        }
    ]);

    const [counter, setCounter] = useState(0);
    const [answerCheck, setAnswerCheck] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const [results, setResults] = useState([])

    const onAnswerClick = (wordId) => {
        if (!answerCheck) {
            const question = state[counter]; 
            if (question.word == wordId) {
                setResults([...results, {[question.word]: 'right'}]);
                setAnswerCheck({[wordId]: 'success'})         
            } else {
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

    return (
        <div className={styles.rulesField}>
            {isFinished
                ? <Scoreboard results={results}/>
                : <div>
                    {answerCheck 
                    ? <img className={styles.gameImg} src={state.image} alt={state.word}/>
                    : <img className={styles.gameImg} src={AudiocallImg} alt='AudiocallImg'/>}
                    <p>{state[counter].audio}</p>
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
                    {answerCheck &&<button onClick={nextQuestion}>Далее</button>}
                </div>
            }

        </div>
    );
};

export default GameField;