import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import classes from './GamePlay.module.scss';
import Preloader from '../../../components/Preloader/Preloader'
import { getAllAggregatedWords } from '../../../api/api';
import FinishGame from './FinishGame';



const GamePlay = () => {
    // const words = useSelector(state => state.words);
    const link = 'https://rslang-db.herokuapp.com/';
    const { finalTranscript, resetTranscript, listening } = useSpeechRecognition()
    const [levelWords, setLevelWords] = useState([]);
    const [tries, setTries] = useState(2);
    const [isGamePlayed, setIsGamePlayed] = useState(false);
    const [allWords, setAllWords] = useState();
    const [oneWord, setOneWord] = useState();
    const [sound, setSound] = useState();
    const [message, setMessage] = useState();
    const [statistics, setStatistics] = useState(10);


    useEffect(async () => {
        const res = await getAllAggregatedWords(0, 0, 34, '{"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}');
        const resWords = res[0].paginatedResults;
        setAllWords(resWords);
    }, []);

    useEffect(async () => {
        newLevelWords(allWords);
        newOneWord(levelWords);
    }, [allWords]);

    const randomiser = arr => Math.floor(Math.random() * arr.length);

    const newLevelWords = (allWords) => {
        let random;
        while (levelWords.length < 3) {
            random = allWords[randomiser(allWords)];
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
        if (levelWords.length < 0) {
            setMessage('Конец игры!')
        } else {
            setMessage(`Осталось ${levelWords.length + 1}`)
        }
    }

    useEffect(() => {
        changeLength();
        handleMessage();
    }, [oneWord])



    const handleTries = () => {
        if (tries === 0) {
            if (levelWords.length > 0) {
                newOneWord(levelWords);
                SpeechRecognition.abortListening();
                setStatistics(() => { statistics - 1 })
                setIsGamePlayed(true);
            }
        }
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
                            <p>{message}</p>
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
                                    {listening && !finalTranscript && <p>Слушаю</p>}

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
                                                handleTries();
                                            }}>{(tries > 0) ? 'Еще раз' : 'Новое слово'}</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </>) : <FinishGame statistics={statistics} newLevelWords={newLevelWords} />}
                </>
            )}
        </>


    );
};

export default GamePlay;

