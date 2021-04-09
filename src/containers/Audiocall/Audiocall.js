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
	const [randomNumArr, setRandomNumArr] = useState();

	useEffect(async () => {
        const res = await getAllAggregatedWords(0, 0, 34, '{"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}');
        const resWords = res[0].paginatedResults;
        setAllWords(resWords);
		randomNumWords();	
    }, []);

	// useEffect(async () => {
    //     newLevelWords(allWords);
    // }, [allWords]);

	const returnToStart = () => {
		setStartGame(false)
	}

	const randomNumWords = () => { 
        let numberArr = [];  
        while(numberArr.length<10) { 
            let random = Math.floor(Math.random()*10);
            if (numberArr.some(number => number === random)) continue;        
            numberArr.push(random)
        }
        setRandomNumArr(numberArr)
    }
	
	return (
		<div>
			<Header title={'Аудио вызов'}/>
			<Menu />
			{startGame
			? <GameField returnToStart={returnToStart} words={allWords} randomNumArr={randomNumArr}/>	
			: (	<div className={styles.rulesField}>
				<div>
					<h1>АУДИОВЫЗОВ</h1>
					<p>Мини-игра «Аудиовызов» - это тренировка, развивающая навыки речи и перевода.</p>
					<p> Вы слышите слово и видите 10 вариантов перевода. Нужно выбрать правильный ответ кликнув по нему мышью.</p> 
					{ allWords == undefined
					? <p>Авторизуйтесь!!!</p>
					: <button className={styles.startGameButton} onClick={()=>setStartGame(true)}>Начать</button>}						
					<NavLink style={{ textDecoration: 'none' }} to={'/games'}>
						<button className={styles.closeGame}>&#9664;</button>
					</NavLink>
				</div>	
			</div>)}		
	
		</div>
	);
};

export default Audiocall;