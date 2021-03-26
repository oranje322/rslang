import React from 'react';
import './Stats.module.scss'
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
const Stats = () => {
	return (
		<div>
			<Header title={'Статистика'}/>
			<Menu/>
		</div>
	);
};

export default Stats;