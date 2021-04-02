export const SET_WORDS = 'SET_WORDS';
export const SET_DIFFICULT = 'SET_DIFFICULT';
export const SET_PAGE = 'SET_PAGE';
export const SET_GROUP = 'SET_GROUP';
export const DELETE_WORD = 'DELETE_WORD'
export const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'


const initialState = {
	activeWords: [],
	currentPage: 0,
	group: 0,
	totalCount: 0
};

export const wordsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_WORDS:
			return {
				...state,
				activeWords: [...action.payload]
			};
		case SET_DIFFICULT:
			return {
				...state,
				activeWords: state.activeWords.map(word => {
					if (word._id === action.payload._id) {
						return {
							...word,
							userWord: {
								difficulty: action.payload.difficulty
							}
						};
					} else {
						return word;
					}
				})
			};
		case SET_PAGE:
			return {
				...state,
				currentPage: action.payload
			};
		case SET_GROUP:
			return {
				...state,
				group: action.payload
			};
		case DELETE_WORD:
			return {
				...state,
				activeWords: state.activeWords.filter(word => word._id !== action.payload._id)
			}
		case SET_TOTAL_COUNT:
			return {
				...state,
				totalCount: action.payload
			}
		default:
			return state;
	}
};