import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import styles from './Audiocall.module.scss';
import GameField from './GameField';
import { getAllAggregatedWords } from '../../api/api';

const Audiocall = () => {
	const [startGame, setStartGame] = useState(false);
    const [allWords, setAllWords] = useState();
	const link = 'https://rslang-db.herokuapp.com/';

	useEffect(async () => {
        const res = await getAllAggregatedWords(0, 0, 10, '{"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}');
        const resWords = res[0].paginatedResults;
        setAllWords(resWords);
    }, []);

	const returnToStart = () => {
		setStartGame(false)
	}
	
	return (
		<div>
			<Header title={'Аудио вызов'}/>
			<Menu />
			{startGame
			? <GameField returnToStart={returnToStart} allWords={allWords}/>	
			: (	<div className={styles.rulesField}>
				<div>
					<h1>АУДИОВЫЗОВ</h1>
					<p>Мини-игра «Аудиовызов» - это тренировка, развивающая навыки речи и перевода.</p>
					<p> Вы слышите слово и видите 5 вариантов перевода. Нужно выбрать правильный ответ кликнув по нему мышью.</p> 
					<button className={styles.startGameButton} onClick={()=>setStartGame(true)}>Начать</button>
					<NavLink style={{ textDecoration: 'none' }} to={'/games'}>
						<button className={styles.closeGame}>X</button>
					</NavLink>
				</div>	
			</div>)}		
	
		</div>
	);
};

export default Audiocall;