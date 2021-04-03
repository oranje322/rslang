import React from 'react';
import styles from './Games.module.scss'
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import { NavLink } from 'react-router-dom';
import FooterBackground from '../../components/FooterBackground/FooterBackground';
import SavannahImg from '@assets/img/savannah.png';
import SprintImg from '@assets/img/Sprint.png';
import AudiocallImg from '@assets/img/Audiocall.png';
import MygameImg from '@assets/img/Mygame.png';

const Games = () => {
	return (
		<div className={styles.gamePages}>
			<Header title={'Игры'} />
			<Menu />
			<div className={styles.gameField}>
				<NavLink to={'/games/savannah'} className={styles.gameNavLink}>
					<div className={styles.itemGame}>
						<img src={SavannahImg} alt='Savannah' />
						<h3>Игра <span>"Саванна"</span></h3>

					</div>
				</NavLink>
				<NavLink to={'/games/audiocall'} className={styles.gameNavLink}>
					<div className={styles.itemGame}>
						<img src={AudiocallImg} alt='Audiocall' />
						<h3>Игра <span>"Аудио вызов"</span></h3>
					</div>
				</NavLink>
				<NavLink to={'/games/sprint'} className={styles.gameNavLink}>
					<div className={styles.itemGame}>
						<img src={SprintImg} alt='Sprint' />
						<h3>Игра <span>"Спринт"</span></h3>
					</div>
				</NavLink>
				<NavLink to={'/games/mygame'} className={styles.gameNavLink}>
					<div className={styles.itemGame}>
						<img src={MygameImg} alt='Mygame' />
						<h3>Игра <span>"Поговорим"</span></h3>
					</div>
				</NavLink>
			</div>
			<FooterBackground />
		</div>
	);
};

export default Games;