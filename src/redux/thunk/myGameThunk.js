import { getAllAggregatedWords, getWords } from '../../api/api';
import {
    setCorrectAnswer,
    setWord,
    setRate,
    setScore,
    setStartedMygame,
    setWinStreak,
    setWordsForMygame,
    setWrongAnswer
} from '../actions/myGameActions';

export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const loadWordsForMyGame = () => async (dispatch, getState) => {

    if (getState().mygame.from === 'menu') {
        const level = getState().mygame.level;
        const res = await getAllAggregatedWords(level, 0, 600, '{"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}');
        const temp = res[0].paginatedResults.map(word => {
            return {
                word: word.word,
                translate: word.wordTranslate,
                transcription: word.transcription,
                id: word._id,
                audio: word.audio
            };
        });
        dispatch(setWordsForMyGame(temp));
    } else {
        const currentPage = getState().words.currentPage
        const group = getState().words.group
        const res = await getWords(group, currentPage)
        const temp = res.map(word => {
            return {
                word: word.word,
                translate: word.wordTranslate,
                transcription: word.transcription,
                id: word._id,
                audio: word.audio
            };
        })
        dispatch(setWordsForSMyGame(temp))
    }
};

export const loadWord = () => async (dispatch, getState) => {
    const words = getState().mygame.words;
    const index = getRandomNumber(2, words.length - 2);
    const currentWord = (Math.floor(Math.random()) === 0)
        ? {
            word: words[index].word,
            translate: words[index].translate,
            correctTranslate: words[index].translate,
            transcription: words[index].transcription,
            id: words[index].id,
            audio: words[index].audio,
            status: true
        }
        : {
            word: words[index].word,
            translate: words[index + 1].translate,
            correctTranslate: words[index].translate,
            transcription: words[index].transcription,
            id: words[index].id,
            audio: words[index].audio,
            status: false
        };
    dispatch(setLoadWord(currentWord));
};

export const startMyGame = () => async (dispatch, getState) => {
    dispatch(setStartedMygame());
    dispatch(loadWord());
};

export const readyAnswer = (answer) => async (dispatch, getState) => {
    const rate = getState().mygame.rate;
    const score = getState().mygame.score;
    const winSteak = getState().mygame.winStreak;

    if (currentPair.status === answer) {
        dispatch(setWinStreak(winSteak + 1));
        if (getState().mygame.winStreak === 4 || getState().mygame.winStreak === 7 || getState().mygame.winStreak === 10) {
            dispatch(setRate(rate * 2));
        }
        dispatch(setScore(score + (10 * getState().mygame.rate)));
        dispatch(setCorrectAnswer(currentPair));
        dispatch(loadWord());

    } else {
        dispatch(setRate(1));
        dispatch(setWinStreak(0));
        dispatch(setWrongAnswer(currentPair));
        dispatch(loadWord());
    }
};