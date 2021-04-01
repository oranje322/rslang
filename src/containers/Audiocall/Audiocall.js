import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import styles from './Audiocall.module.scss';
import GameField from './GameField';

const Audiocall = () => {
	return (
		<div>
			<Header title={'Аудио вызов'}/>
			<Menu />
			<GameField />
			{/* <NavLink to={'/games'}><h2>Назад</h2></NavLink> */}
			{/* <div className={styles.rulesField}>
				<h1>АУДИОВЫЗОВ</h1>
				<p>Мини-игра «Аудиовызов» - это тренировка, развивающая навыки речи и перевода.</p>
				<ul> Вы слышите слово и видите 5 вариантов перевода. Выбрать правильный ответ можно двумя способами:
					<li>1. Кликните по нему мышью;</li>
					<li>2. Используйте клавиши 1, 2, 3, 4, 5.</li>
				</ul> 
				
			</div>			 */}
		</div>
	);
};

export default Audiocall;