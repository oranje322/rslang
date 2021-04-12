export const SET_WORDS_FOR_GAME = 'SET_WORDS_FOR_GAME';
export const SET_FROM = 'SET_FROM';

const initialState = {
    words: [],
    from: 'menu'
};

export const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WORDS_FOR_GAME:
            return {
                ...state,
                words: action.payload
            };

        case SET_FROM:
            return {
                ...state,
                from: action.payload
            }
        default:
            return state;
    }
};