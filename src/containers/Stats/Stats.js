import React, { useEffect } from 'react';
import './Stats.module.scss';
import Header from '../../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { setStats } from '../../redux/actions/statsAction';
import { getStatistics } from '../../api/api';

const Stats = () => {

	const dispatch = useDispatch();

	const {learnedWords, correctAnswers, wrongAnswers} = useSelector(state => state.stats)



	useEffect(async () => {
		const { learnedWords } = await getStatistics();
		dispatch(setStats(learnedWords));
	}, []);

	return (
		<>
			<Header title={'Статистика'}/>
			<div style={{marginLeft: "8rem", marginTop: "2rem"}}>
				<p>{`Всего активных слов: ${learnedWords}`}</p>
				<p>{`Правильных ответов в играх: ${correctAnswers}`}</p>
				<p>{`Неправильных ответов в играх: ${wrongAnswers}`}</p>
			</div>

		</>
	);
};

export default Stats;