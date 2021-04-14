import React, { useEffect } from 'react';
import './Stats.module.scss';
import Header from '../../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { setStats } from '../../redux/actions/statsAction';
import { getStatistics } from '../../api/api';

const Stats = () => {

	const dispatch = useDispatch();

	const {learnedWords} = useSelector(state => state.stats)



	useEffect(async () => {
		const { learnedWords } = await getStatistics();
		dispatch(setStats(learnedWords));
	}, []);

	return (
		<div>
			<Header title={'Статистика'}/>

			<p>Всего активных слов</p>
		</div>
	);
};

export default Stats;