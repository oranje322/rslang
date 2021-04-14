export const SET_STATS = 'SET_STATS'

const initialState = {
	sprint: {},
	learnedWords: 0
}

export const statsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_STATS:
			return {
				...state,
				learnedWords: action.payload
			}
		default:
			return state
	}
}