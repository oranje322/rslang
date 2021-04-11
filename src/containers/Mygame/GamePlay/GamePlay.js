import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import classes from './GamePlay.module.scss';
import Preloader from '../../../components/Preloader/Preloader'
import EndGame from './EndGame/EndGame';
import { loadWordsForMyGame } from '../../../redux/thunk/myGameThunk';

const GamePlay = () => {
    const link = 'https://rslang-db.herokuapp.com/';
    const { finalTranscript, resetTranscript, listening } = useSpeechRecognition()
    const [levelWords, setLevelWords] = useState([]);
    const [tries, setTries] = useState(2);
    const [isGamePlayed, setIsGamePlayed] = useState(false);
    const [allWords, setAllWords] = useState();
    const [oneWord, setOneWord] = useState();
    const [sound, setSound] = useState();
    const [message, setMessage] = useState();
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [statistics, setStatistics] = useState(10);
    const correctSound = new Audio('http://soundimage.org/wp-content/uploads/2016/04/UI_Quirky1.mp3');
    const wrongSound = new Audio('http://soundimage.org/wp-content/uploads/2016/04/UI_Quirky33.mp3');

    const dispatch = useDispatch();
    const { words } = useSelector(state => state.mygame);

    useEffect(() => {
        dispatch(loadWordsForMyGame());
    }, []);

    const randomiser = (arr) => Math.floor(Math.random() * arr.length);

    const newLevelWords = (words) => {
        while (levelWords.length < 3) {
            let random = words[randomiser(words)];
            levelWords.push(random);
            if (levelWords.some(word => word._id === random._id)) continue;
            levelWords.push(random);
        }
    }
    const newOneWord = (levelWords) => {
        setOneWord(levelWords[randomiser(levelWords)]);
        setTries(2);
        if (levelWords.length === 0) {
            setIsGamePlayed(true);
        }
    }

    const changeLength = () => {
        const index = levelWords.indexOf(oneWord);
        levelWords.splice(index, 1);
        setLevelWords(levelWords);
    }

    const handleMessage = () => {
        if (levelWords.length === 0) {
            setMessage('Последнее слово!')
        } else {
            setMessage(`Осталось ${levelWords.length + 1}`)
        }
    }
    useEffect(() => {
        if (words.length !== 0) {
            newLevelWords(words);
            newOneWord(levelWords);
        }
    }, [words]);


    useEffect(() => {
        changeLength();
        handleMessage();
    }, [oneWord])


    useEffect(() => {
        if (finalTranscript && finalTranscript.toLowerCase() === oneWord.word) {
            correctSound.play();
            correctAnswers.push(oneWord);
            setCorrectAnswers(correctAnswers);
        } else if (finalTranscript) wrongSound.play();
    }, [oneWord, finalTranscript])


    const handleTries = (oneWord) => {
        if (tries === 0) {
            if (levelWords.length > 0) {
                newOneWord(levelWords);
                SpeechRecognition.abortListening();
                setStatistics(statistics - 1)
                setIsGamePlayed(false);
                wrongAnswers.push(oneWord);
                setWrongAnswers(wrongAnswers);
            } else setIsGamePlayed(true);
        }
    }

    const reGame = () => {
        newLevelWords(words);
        newOneWord(levelWords);
        setIsGamePlayed(false);
    }

    useEffect(async () => {
        try {
            const mus = new Audio(link + oneWord.audio);
            setSound(mus);
        } catch (e) { (e) };
    }, [oneWord])

    const listen = () => {
        sound && sound.play();
    };

    return (
        <>
            {!oneWord && !isGamePlayed ? <Preloader /> : (
                <>
                    {!isGamePlayed ? (
                        <>
                            <p className={classes.message}>{message}</p>
                            <div className={classes.Container}>
                                <div className={classes.gameContainer}>
                                    <img onClick={listen} className={classes.img} src={link + oneWord.image} />
                                    <div className={classes.wordContainer}>
                                        <h3>{oneWord.word}</h3>
                                        <span>{oneWord.wordTranslate}</span>
                                    </div>

                                    {finalTranscript && <span>Вы сказали: <b>{finalTranscript} </b></span>}

                                    {!listening && !finalTranscript &&
                                        <button className={classes.button} onClick={SpeechRecognition.startListening}>Начать</button>
                                    }
                                    {listening && !finalTranscript && <p>Слушаю...</p>}

                                    {finalTranscript && (finalTranscript.toLowerCase() === oneWord.word ?
                                        <>
                                            <p className={classes.p}>Правильно!</p>
                                            <button className={classes.button} onClick={() => {
                                                newOneWord(levelWords);
                                                resetTranscript();
                                            }}>Новое слово</button>
                                        </>
                                        :
                                        <>
                                            <p className={classes.p}>Что-то не так :(</p>
                                            <button className={classes.button} onClick={() => {
                                                resetTranscript();
                                                SpeechRecognition.startListening();
                                                setTries(() => tries - 1);
                                                handleTries(oneWord);
                                            }}>{(tries > 0) ? 'Еще раз' : 'Новое слово'}</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </>) :
                        <EndGame reGame={reGame} statistics={statistics} wrongAnswers={wrongAnswers} correctAnswers={correctAnswers} />}
                </>
            )
            }
        </>
    )
};

export default GamePlay;

