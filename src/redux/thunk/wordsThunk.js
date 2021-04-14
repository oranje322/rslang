import {
	createUserWord,
	deleteUserWord,
	getAllAggregatedWords,
	getWords,
	loadWordsForVocabulary,
	updateUserWord
} from '../../api/api';
import { deleteWordAC, setDifficulty, setTotalCount, setWordsAC } from '../actions/WordsActions';
import { setStatsThunk } from './statsThunk';

export const loadWordsThunk = () => async (dispatch, getState) => {
	const isAuth = getState().auth.isAuth;
	const group = getState().words.group;
	const currentPage = getState().words.currentPage;

	if (isAuth) {
		const res = await getAllAggregatedWords(
			group,
			currentPage,
			20,
			'{"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}'
		);
		dispatch(setTotalCount(res[0].totalCount[0].count))
		dispatch(setWordsAC(res[0].paginatedResults));
	} else {
		const words = await getWords(group, currentPage);
		dispatch(setWordsAC(words));
	}
};

export const loadHardWordsThunk = () => async (dispatch, getState) => {
	const isAuth = getState().auth.isAuth;
	const group = getState().words.group;
	const currentPage = getState().words.currentPage;

	if (isAuth) {
		const res = await loadWordsForVocabulary(
			group,
			currentPage,
			20,
			'{"$or":[{"userWord.difficulty":"hard"}]}'
		);
		dispatch(setWordsAC(res[0].paginatedResults));
		dispatch(setTotalCount(res[0].totalCount[0].count))
	}
};

export const loadEasyWordsThunk = () => async (dispatch, getState) => {
	const isAuth = getState().auth.isAuth;
	const group = getState().words.group;
	const currentPage = getState().words.currentPage;
	const wordsPerPage = 20;

	if (isAuth) {
		const res = await loadWordsForVocabulary(group,
			currentPage,
			wordsPerPage,
			'{"$or":[{"userWord.difficulty":"easy"}]}'
		);
		dispatch(setWordsAC(res[0].paginatedResults));
		dispatch(setTotalCount(res[0].totalCount[0].count))
	}
};

export const loadActiveWordsThunk = () => async (dispatch, getState) => {
	const isAuth = getState().auth.isAuth;
	const group = getState().words.group;
	const currentPage = getState().words.currentPage;
	const wordsPerPage = 20;

	if (isAuth) {
		const res = await loadWordsForVocabulary(group,
			currentPage,
			wordsPerPage,
			'{"userWord.optional.active":true}'
		);
		dispatch(setWordsAC(res[0].paginatedResults));
		dispatch(setTotalCount(res[0].totalCount[0].count))
		dispatch(setStatsThunk())
	}
};

export const setDifficultyWordsThunk = (word, difficulty, section) => async (dispatch, getState) => {
	if (difficulty === null) {
		try {
			await deleteUserWord(word._id);
			if (section === 'delete') {
				dispatch(deleteWordAC({ _id: word._id }));
			} else if (section === 'hard') {
				dispatch(deleteWordAC({ _id: word._id }));
			} else {
				dispatch(setDifficulty({ _id: word._id, difficulty }));
			}
		} catch (e) {
			throw e;
		}
	} else if (difficulty && word.userWord?.difficulty) {
		try {
			await updateUserWord(word._id, difficulty);
			if (difficulty === 'easy') {
				dispatch(deleteWordAC({ _id: word._id }));
			}
			if (difficulty === 'hard') {
				dispatch(setDifficulty({ ...word, difficulty }));
			}
		} catch (e) {
			throw e;
		}
	} else {
		try {
			await createUserWord(word._id, difficulty);
			if (difficulty === 'easy') {
				dispatch(deleteWordAC({ _id: word._id }));
			}
			if (difficulty === 'hard') {
				dispatch(setDifficulty({ ...word, difficulty }));
			}
		} catch (e) {
			throw e;
		}
	}
};




