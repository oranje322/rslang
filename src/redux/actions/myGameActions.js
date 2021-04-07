import {
    SET_CORRECT_ANSWER,
    SET_FINISHED_MYGAME, SET_FROM, SET_LEVEL,
    SET_RATE, SET_SCORE, SET_WORD,
    SET_STARTED_MYGAME, SET_WINSTREAK,
    SET_WORDS_FOR_MYGAME, SET_WRONG_ANSWER
} from '../reducers/myGameReducer';

export const setStartedMygame = () => ({ type: SET_STARTED_MYGAME })
export const setFinishedMygame = () => ({ type: SET_FINISHED_MYGAME })
export const setWordsForMygame = payload => ({ type: SET_WORDS_FOR_MYGAME, payload })
export const setRate = payload => ({ type: SET_RATE, payload })
export const setScore = payload => ({ type: SET_SCORE, payload })
export const setWinStreak = payload => ({ type: SET_WINSTREAK, payload })
export const setCorrectAnswer = payload => ({ type: SET_CORRECT_ANSWER, payload })
export const setWrongAnswer = payload => ({ type: SET_WRONG_ANSWER, payload })
export const setLevel = payload => ({ type: SET_LEVEL, payload })
export const setFrom = payload => ({ type: SET_FROM, payload })
export const setLoadWord = payload => ({ type: SET_WORD, payload })
