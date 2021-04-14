import { getStatistics, loadWordsForVocabulary, setStatistics } from '../../api/api';
import { setStats } from '../actions/statsAction';

export const statsThunk = () => async (dispatch, getState) => {
	const isAuth = getState().auth.isAuth
	if (isAuth) {
		const stats = await getStatistics()
		dispatch(setStats({
			learnedWords: stats.learnedWords,
			correctAnswers: stats.optional.correctAnswers,
			wrongAnswers: stats.optional.wrongAnswers
		}))
	}
}

export const setStatsThunk = (correctAnswersInGame = 0, wrongAnswersInGame = 0) => async (dispatch, getState) => {
	const isAuth = getState().auth.isAuth
	if (isAuth) {
		const countWordsResp = await loadWordsForVocabulary(0,
			0,
			20,
			'{"userWord.optional.active":true}'
		);
		const learnedWords = countWordsResp[0].totalCount[0].count

		const stats = getState().stats
		const correctAnswers = stats.correctAnswers + correctAnswersInGame
		const wrongAnswers = stats.wrongAnswers + wrongAnswersInGame

		const respStatistics = await setStatistics(learnedWords, correctAnswers, wrongAnswers)

		dispatch(setStats({
			learnedWords: respStatistics.learnedWords,
			correctAnswers: respStatistics.optional.correctAnswers,
			wrongAnswers: respStatistics.optional.wrongAnswers
		}))
	}
}