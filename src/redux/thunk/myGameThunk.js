import { getAllAggregatedWords, getWords } from '../../api/api';
import { setWordsForMygame } from '../actions/myGameActions';


export const loadWordsForMyGame = () => async (dispatch, getState) => {
    const isAuth = getState().auth.isAuth;
    if (isAuth) {
        if (getState().mygame.from === 'menu') {
            const res = await getAllAggregatedWords(0, 0, 600, '{"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}');
            const temp = res[0].paginatedResults.map(word => {
                return {
                    ...word
                };
            });
            dispatch(setWordsForMygame(temp));
        } else {
            const res = getState().words.activeWords;
            const temp = res.map(word => {
                return {
                    ...word
                };
            })
            dispatch(setWordsForMygame(temp))
        }
    } else {
        const currentPage = getState().words.currentPage
        const level = getState().sprint.level;
        const res = await getWords(level, currentPage)
        const temp = res.map(word => {
            return {
                ...word
            };
        })
        dispatch(setWordsForMygame(temp));
    };
}
