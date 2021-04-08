export const SET_STARTED_SPRINT = 'SET_STARTED_SPRINT';
export const SET_FINISHED_SPRINT = 'SET_FINISHED_SPRINT';
export const SET_WORDS_FOR_SPRINT = 'SET_WORDS_FOR_SPRINT';
export const SET_LOAD_PAIR = 'SET_LOAD_PAIR';
export const SET_RATE = 'SET_RATE';
export const SET_SCORE = 'SET_SCORE';
export const SET_WINSTREAK = 'SET_WINSTREAK';
export const SET_CORRECT_ANSWER = 'SET_CORRECT_ANSWER';
export const SET_WRONG_ANSWER = 'SET_WRONG_ANSWER';
export const SET_LEVEL = 'SET_LEVEL';
export const SET_FROM = 'SET_FROM';


const initialState = {
	isStarted: false,
	isFinished: false,
	words: [],
	loadPair: {},
	rate: 1,
	score: 0,
	winStreak: 0,
	correctAnswers: [],
	wrongAnswers: [],
	level: 0,
	from: 'menu'
};

export const sprintReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_WORDS_FOR_SPRINT:
			return {
				...state,
				words: action.payload
			};
		case SET_LEVEL:
			return {
				...state,
				level: action.payload
			};
		case SET_FROM:
			return {
				...state,
				from: action.payload,
				isStarted: false,
				isFinished: false,
			}
		case SET_STARTED_SPRINT:
			return {
				...state,
				isStarted: true,
				isFinished: false,
				rate: 1,
				score: 0,
				winStreak: 0,
				correctAnswers: [],
				wrongAnswers: []
			};
		case SET_FINISHED_SPRINT:
			return {
				...state,
				isFinished: true,
				isStarted: false
			};
		case SET_LOAD_PAIR:
			return {
				...state,
				loadPair: action.payload
			};
		case SET_RATE:
			return {
				...state,
				rate: action.payload
			};
		case SET_SCORE:
			return {
				...state,
				score: action.payload
			};
		case SET_WINSTREAK:
			return {
				...state,
				winStreak: action.payload
			};
		case SET_CORRECT_ANSWER:
			return {
				...state,
				correctAnswers: [...state.correctAnswers, action.payload]
			};
		case SET_WRONG_ANSWER:
			return {
				...state,
				wrongAnswers: [...state.wrongAnswers, action.payload]
			};
		default:
			return state;
	}
};