import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import classes from './Mygame.module.scss';

const GamePlay = () => {
    const words = useSelector(state => state.words);
    const { finalTranscript, resetTranscript, listening } = useSpeechRecognition()
    const [lifes, setLifes] = useState(5);
    const [isGamePlayed, setIsGamePlayed] = useState(false);
    const [wordsPosition, setWordsPosition] = useState('70%');
    const [allWords, setAllWords] = useState();
    const [levelWords, setLevelWords] = useState();
    const [correctWord, setCorrectWord] = useState();
    const [statistics, setStatistics] = useState(0);
    const winStats = 10;

    useEffect(async () => {
        const res = await getAllAggregatedWords(0, 0, 34, '{"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}');
        const resWords = res[0].paginatedResults;
        setAllWords(resWords);
        console.log('resWords: ', resWords);
    }, []);

    return (

        <div className={classes.gameContainer}>

        </div>


    );
};

export default GamePlay;

