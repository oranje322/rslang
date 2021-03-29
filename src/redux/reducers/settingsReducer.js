export const DEL_BUTTON = 'DEL_BUTTON';
export const DIFF_BUTTON = 'DIFF_BUTTON';
export const WORD_TRANSLATION = 'WORD_TRANSLATION';
export const SENTENCE_TRANSLATION = 'SENTENCE_TRANSLATION';


const initialState = {
    difficultButton: true,
    deleteButton: true,
    wordTranslation: true,
    sentenceTranslation: true
};

export const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DEL_BUTTON:
            return {
                ...state,
                deleteButton: !state.deleteButton
            };
        case DIFF_BUTTON:
            return {
                ...state,
                difficultButton: !state.difficultButton
            };
        case WORD_TRANSLATION:
            return {
                ...state,
                wordTranslation: !state.wordTranslation
            };
        case SENTENCE_TRANSLATION:
            return {
                ...state,
                sentenceTranslation: !state.sentenceTranslation
            };
        default:
            return state;

    }
};