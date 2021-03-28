import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';

const Audiocall = () => {
	return (
		<div>
			<Header title={'Аудио вызов'}/>
			<Menu/>
			<NavLink to={'/games'}><h2>Назад</h2></NavLink>
		</div>
	);
};

export default Audiocall;