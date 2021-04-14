export const SET_STATS = 'SET_STATS'

const initialState = {
	learnedWords: 0,
	correctAnswers: 0,
	wrongAnswers: 0,
}

export const statsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_STATS:
			return {
				...state,
				...action.payload
			}
		default:
			return state
	}
}