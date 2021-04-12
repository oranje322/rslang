import {
    SET_FROM,
    SET_WORDS_FOR_GAME
} from '../reducers/gamesReducer';



export const setWordsForGame = payload => ({ type: SET_WORDS_FOR_GAME, payload })
export const setFrom = payload => ({ type: SET_FROM, payload })

