import {
    SET_FROM_GAMES,
    SET_WORDS_FOR_GAME
} from '../reducers/gamesReducer';



export const setWordsForGame = payload => ({ type: SET_WORDS_FOR_GAME, payload })
export const setFromGames = payload => ({ type: SET_FROM_GAMES, payload })

