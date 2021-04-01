import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import GamePlay from './GamePlay/GamePlay';

import classes from './Mygame.module.scss';
const Mygame = () => {
	const [game, setGame] = useState(true);

	return (
		<div>
			<Header title={'Поговорим'} />
			<Menu />
			<div className={classes.wrapper}>
				<NavLink to={'/games'}><h4 onClick={() => setGame(!game)}>Назад</h4></NavLink>
				{game ? <>
					<h2>Игра: Поговорим</h2>
					<p>Проверьте звучание нажав на слово</p>
					<p>Кликните Начать и произнесите слова</p>
					<button className={classes.button} onClick={() => setGame(!game)}>Старт</button>
				</> :
					<GamePlay />
				}
			</div>
		</div>
	);
};

export default Mygame;

