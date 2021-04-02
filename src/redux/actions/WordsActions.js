import { DELETE_WORD, SET_DIFFICULT, SET_GROUP, SET_PAGE, SET_TOTAL_COUNT, SET_WORDS } from '../reducers/wordsReducer';

export const setWordsAC = (payload) => ({type: SET_WORDS, payload})
export const setDifficulty = (payload) => ({type: SET_DIFFICULT, payload})
export const setPage = (payload) => ({type: SET_PAGE, payload})
export const setGroup = (payload) => ({type: SET_GROUP, payload})
export const deleteWordAC = (payload) => ({type: DELETE_WORD, payload})
export const setTotalCount = (payload) => ({type: SET_TOTAL_COUNT, payload})