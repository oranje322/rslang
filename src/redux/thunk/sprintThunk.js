import { getAllAggregatedWords, getWords } from '../../api/api';
import {
	setCorrectAnswer, setFinishedSprint,
	setLoadPair,
	setRate,
	setScore,
	setStartedSprint,
	setWinStreak,
	setWordsForSprint,
	setWrongAnswer
} from '../actions/sprintActions';
import { correctSound, streakSound, wrongSound } from '../../utils/constants';
import { setStatsThunk } from './statsThunk';

export function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const loadWordsForSprint = () => async (dispatch, getState) => {
	const isAuth = getState().auth.isAuth;

	if (isAuth) {
		if (getState().sprint.from === 'menu') {
			const level = getState().sprint.level;
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
			dispatch(setWordsForSprint(temp));
		} else {
			const res = getState().words.activeWords;

			console.log(res);
			const temp = res.map(word => {
				return {
					word: word.word,
					translate: word.wordTranslate,
					transcription: word.transcription,
					id: word._id,
					audio: word.audio
				};
			});
			dispatch(setWordsForSprint(temp));
		}
	} else {
		const currentPage = getState().words.currentPage
		const level = getState().sprint.level;
		const res = await getWords(level, currentPage)
		const temp = res.map(word => {
			return {
				word: word.word,
				translate: word.wordTranslate,
				transcription: word.transcription,
				id: word._id,
				audio: word.audio
			};
		})
		dispatch(setWordsForSprint(temp));
	}
};

export const loadPair = () => async (dispatch, getState) => {
	const words = getState().sprint.words;
	const index = getRandomNumber(0, words.length - 1);
	const currentPair = (Math.floor(Math.random() * 2) === 0)
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
			translate: words[getRandomNumber(0, words.length - 1)].translate,
			correctTranslate: words[index].translate,
			transcription: words[index].transcription,
			id: words[index].id,
			audio: words[index].audio,
			status: false
		};
	dispatch(setLoadPair(currentPair));
};

export const startSprint = () => async (dispatch, getState) => {
	dispatch(setStartedSprint());
	dispatch(loadPair());
};

export const clickAnswer = (answer) => async (dispatch, getState) => {
	const currentPair = getState().sprint.loadPair;
	const rate = getState().sprint.rate;
	const score = getState().sprint.score;
	const winSteak = getState().sprint.winStreak;

	if (currentPair.status === answer) {
		dispatch(setWinStreak(winSteak + 1));
		if (getState().sprint.winStreak === 4 || getState().sprint.winStreak === 7 || getState().sprint.winStreak === 10) {
			streakSound.play();
			dispatch(setRate(rate * 2));
		}
		dispatch(setScore(score + (10 * getState().sprint.rate)));
		dispatch(setCorrectAnswer(currentPair));
		correctSound.currentTime = 0;
		correctSound.play();
		dispatch(loadPair());

	} else {
		dispatch(setRate(1));
		dispatch(setWinStreak(0));
		dispatch(setWrongAnswer(currentPair));
		wrongSound.currentTime = 0;
		wrongSound.play();
		dispatch(loadPair());
	}
};

export const finishSprintThunk = () => async (dispatch, getState) => {
	const {correctAnswers, wrongAnswers} = getState().sprint
	dispatch(setFinishedSprint())
	dispatch(setStatsThunk(correctAnswers.length, wrongAnswers.length))
}