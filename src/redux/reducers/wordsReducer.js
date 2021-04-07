export const SET_WORDS = 'SET_WORDS'

const initialState = {
	activeWords: []
}

export const wordsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_WORDS:
			console.log(action.payload)
			return {
				...state,
				activeWords: [...action.payload]
			}
		default:
			return state
	}
}