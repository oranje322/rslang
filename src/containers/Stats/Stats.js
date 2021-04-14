import React, { useEffect } from 'react';
import styles from './Stats.module.scss';
import Header from '../../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { setStats } from '../../redux/actions/statsAction';
import { getStatistics } from '../../api/api';

const Stats = () => {

	const dispatch = useDispatch();

	const { learnedWords, correctAnswers, wrongAnswers } = useSelector(state => state.stats)



	useEffect(async () => {
		const { learnedWords } = await getStatistics();
		dispatch(setStats(learnedWords));
	}, []);

	return (
		<>
			<Header title={'Статистика'} />
			<div className={styles.wrapper}>
				<p>Всего активных слов: <span> {learnedWords} </span></p>
				<p>Правильных ответов в играх: <span>{correctAnswers}</span></p>
				<p>Неправильных ответов в играх:<span>{wrongAnswers}</span></p>
			</div>
			<img className={styles.pic} src={'/src/assets/img/stats.png'}></img>

		</>
	);
};

export default Stats;