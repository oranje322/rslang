import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import styles from './Audiocall.module.scss';
import GameField from './GameField';
import { loadWordsForGame } from '../../redux/thunk/gamesThunk';
import { useDispatch, useSelector } from 'react-redux';

const Audiocall = () => {
	const [startGame, setStartGame] = useState(false);
	const [randomNumArr, setRandomNumArr] = useState();
	const dispatch = useDispatch();
    const { words } = useSelector(state => state.games);

    useEffect(() => {
        dispatch(loadWordsForGame());
		randomNumWords();
    }, []);

	const returnToStart = () => {
		setStartGame(false)
	}

	const randomNumWords = () => { 
        let numberArr = [];  
        while(numberArr.length< 10) { 
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
			? <GameField returnToStart={returnToStart} words={words} randomNumArr={randomNumArr}/>	
			: (	<div className={styles.rulesField}>
				<div className={styles.rulesFieldMain}>
					<h1>Игра: АУДИОВЫЗОВ</h1>
					<p>Мини-игра «Аудиовызов» - это тренировка, развивающая навыки речи и перевода.</p>
					<p> Вы слышите слово и видите 10 вариантов перевода. Нужно выбрать правильный ответ кликнув по нему мышью.</p> 
					{ words == false || words.length<10
					? <p>У вас нет активных слов или сложных слов меньше 10, перейдите в раздел Учебник и выберите раздел</p>
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