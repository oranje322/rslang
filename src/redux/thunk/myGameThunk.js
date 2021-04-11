import { getAllAggregatedWords, getWords } from '../../api/api';
import { setWordsForMygame } from '../actions/myGameActions';


export const loadWordsForMyGame = () => async (dispatch, getState) => {
    if (getState().mygame.from === 'menu') {
        const res = await getAllAggregatedWords(0, 0, 600, '{"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}');
        const temp = res[0].paginatedResults.map(word => {
            return {
                word: word.word,
                translate: word.wordTranslate,
                transcription: word.transcription,
                id: word._id,
                audio: word.audio,
                image: word.image
            };
        });
        dispatch(setWordsForMygame(temp));
    } else {
        const currentPage = getState().words.activeWords;
        const group = getState().words.group
        const res = await getWords(group, currentPage)
        const temp = res.map(word => {
            return {
                word: word.word,
                translate: word.wordTranslate,
                transcription: word.transcription,
                id: word._id,
                audio: word.audio,
                image: word.image
            };
        })
        dispatch(setWordsForMygame(temp))
    }
};

