import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';

const Mygame = () => {
	return (
		<div>
			<Header title={'Своя игра'}/>
			<Menu/>
			<NavLink to={'/games'}><h2>Назад</h2></NavLink>
		</div>
	);
};

export default Mygame;