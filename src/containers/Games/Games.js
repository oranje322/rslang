import React from 'react';
import styles from './Games.module.scss'
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import FooterBackImg from '@assets/img/Vector.png';
import { NavLink } from 'react-router-dom';

const Games = () => {
	return (
		<div className={styles.gamePages}>
			<Header title={'Игры'}/>
			<Menu/>
			<div className={styles.gameField}>
				<NavLink to={'/games/savannah'} >
					<div className={styles.itemGame}>
						<h2>Игра "Саванна"</h2>
					</div>
				</NavLink>
				<NavLink to={'/games/audiocall'}>
					<div className={styles.itemGame}>
						<h2>Игра "Аудио вызов"</h2>					
					</div>
				</NavLink>
				<NavLink to={'/games/sprint'}>
					<div className={styles.itemGame}>
						<h2>Игра "Спринт"</h2>
					</div>
				</NavLink>
				<NavLink to={'/games/mygame'}>
					<div className={styles.itemGame}>
						<h2>"Своя игра"</h2>
					</div>
				</NavLink>
			</div>
			<div className={styles.footerBackground}>
				<img src={FooterBackImg} alt='Vector' />
			</div>			
		</div>
	);
};

export default Games;