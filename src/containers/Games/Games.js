import React from 'react';
import styles from './Games.module.scss'
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';

const Games = () => {
	return (
		<div>
			<Header title={'Игры'}/>
			<Menu/>
		</div>
	);
};

export default Games;