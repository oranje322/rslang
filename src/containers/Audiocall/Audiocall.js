import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import styles from './Audiocall.module.scss';
import GameField from './GameField';

const Audiocall = () => {
	const [startGame, setStartGame] = useState(false);
	return (
		<div>
			<Header title={'Аудио вызов'}/>
			<Menu />
			{startGame
			? <GameField />	
			: (	<div className={styles.rulesField}>
				<h1>АУДИОВЫЗОВ</h1>
				<p>Мини-игра «Аудиовызов» - это тренировка, развивающая навыки речи и перевода.</p>
				<p> Вы слышите слово и видите 5 вариантов перевода. Нужно выбрать правильный ответ кликнув по нему мышью.</p> 
				<button onClick={()=>setStartGame(true)}>Начать</button>
				<NavLink to={'/games'}><p>Назад</p></NavLink>	
			</div>)}		
	
		</div>
	);
};

export default Audiocall;