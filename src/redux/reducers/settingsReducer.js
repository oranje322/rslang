export const DEL_BUTTON = 'DEL_BUTTON';
export const DIFF_BUTTON = 'DIFF_BUTTON';
export const WORD_TRANSLATION = 'WORD_TRANSLATION';
export const SENTENCE_TRANSLATION = 'SENTENCE_TRANSLATION';


const initialState = {
    set: {
        difficultButton: true,
        deleteButton: true,
        wordTranslation: true,
        sentenceTranslation: true,
    }
};

console.log('initialState: ', initialState);
export const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DEL_BUTTON:
            return {
                ...state,
                deleteButton: !state.set.deleteButton
            };
        case DIFF_BUTTON:
            return {
                ...state,
                difficultButton: !state.set.difficultButton
            };
        case WORD_TRANSLATION:
            return {
                ...state,
                wordTranslation: !state.set.wordTranslation
            };
        case SENTENCE_TRANSLATION:
            return {
                ...state,
                sentenceTranslation: !state.set.wordTranslation
            };
        default:
            return state;

    }
};