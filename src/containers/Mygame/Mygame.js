import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import GamePlay from './GamePlay/GamePlay';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Mygame.module.scss';

const Mygame = () => {

	const [game, setGame] = useState(true);

	const words = useSelector(state => state.words.activeWords);

	/*
	активные слова?
	const [allwords, setAllWoards] = useState();
	useEffect(() => {
		words && setAllWoards(words);
	}, []);
	*/


	return (
		<div>
			<Header title={'Поговорим'} />
			<Menu />
			<div className={classes.wrapper}>
				{game ? <>
					<NavLink to={'/games'}><h4 className={classes.back} onClick={() => setGame(!game)}>&#9664;</h4></NavLink>
					<h2>Игра: Поговорим</h2>
					<p>Проверьте звучание нажав на картинку</p>
					<p>Кликните Начать и произнесите слово</p>
					<button className={classes.button} onClick={() => setGame(!game)}>Старт</button>
				</> :
					<GamePlay words={words} />
				}
			</div>
		</div>
	);
};

export default Mygame;

