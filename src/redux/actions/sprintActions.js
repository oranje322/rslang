import {
	SET_CORRECT_ANSWER,
	SET_FINISHED_SPRINT, SET_FROM, SET_LEVEL,
	SET_LOAD_PAIR, SET_RATE, SET_SCORE,
	SET_STARTED_SPRINT, SET_WINSTREAK,
	SET_WORDS_FOR_SPRINT, SET_WRONG_ANSWER
} from '../reducers/sprintReducer';

export const setStartedSprint = () => ({type: SET_STARTED_SPRINT})
export const setFinishedSprint = () => ({type: SET_FINISHED_SPRINT})
export const setWordsForSprint = payload => ({type: SET_WORDS_FOR_SPRINT, payload})
export const setLoadPair = payload => ({type: SET_LOAD_PAIR, payload})
export const setRate = payload => ({type: SET_RATE, payload})
export const setScore = payload => ({type: SET_SCORE, payload})
export const setWinStreak = payload => ({type: SET_WINSTREAK, payload})
export const setCorrectAnswer = payload => ({type: SET_CORRECT_ANSWER, payload})
export const setWrongAnswer = payload => ({type: SET_WRONG_ANSWER, payload})
export const setLevel = payload => ({type: SET_LEVEL, payload})
export const setFrom = payload => ({type: SET_FROM, payload})