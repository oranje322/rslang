import { DEL_BUTTON, DIFF_BUTTON, WORD_TRANSLATION, SENTENCE_TRANSLATION } from '../reducers/settingsReducer';

export const deleteButton = () => (
    { type: DEL_BUTTON });

export const difficultButton = () => (
    { type: DIFF_BUTTON });

export const wordTranslation = () => (
    { type: WORD_TRANSLATION });

export const sentenceTranslation = () => (
    { type: SENTENCE_TRANSLATION });