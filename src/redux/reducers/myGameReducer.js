export const SET_WORDS_FOR_MYGAME = 'SET_WORDS_FOR_MYGAME';
export const SET_FROM = 'SET_FROM';

const initialState = {
    words: [],
    from: 'menu'
};

export const MyGameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WORDS_FOR_MYGAME:
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