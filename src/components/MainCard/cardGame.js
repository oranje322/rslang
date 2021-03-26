import React from 'react';
import classes from './cardMain.scss';
import gameImg from '../../assets/img/sega.png';
import { Link } from 'react-router-dom';

const CardGame = () => {
	function clickGame() {

	}

	let { cardBox, caral, buttonBox, imgGame } = classes;

	return (
		<div className={`${caral} ${cardBox}`}>
			<h2>Мини игры</h2>
			<p>геймификация для активного запоминания</p>
			<div className={classes.box}>
				<img src={gameImg} className={imgGame} alt='sega'/>
				<div className={buttonBox}>
					<Link to={'/games'}>
						<button>Посмотреть</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default CardGame;