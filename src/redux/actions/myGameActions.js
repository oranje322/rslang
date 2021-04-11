import {
    SET_FROM,
    SET_WORDS_FOR_MYGAME
} from '../reducers/myGameReducer';



export const setWordsForMygame = payload => ({ type: SET_WORDS_FOR_MYGAME, payload })
export const setFrom = payload => ({ type: SET_FROM, payload })

