import { createUserWord } from '../../api/api';

export const wordsToStat = () => (dispatch, getState) => {
 const words = getState().words.activeWords

		words.map(word => {
			createUserWord(word._id)
		})
}