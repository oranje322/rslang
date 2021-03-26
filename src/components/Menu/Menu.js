import React from 'react';
import styles from './Menu.module.scss';
import book from '@assets/img/book.png';
import list from '@assets/img/list.png';
import game from '@assets/img/game.png';
import stat from '@assets/img/stat.png';
import settings from '@assets/img/settings.png';
import { Link } from 'react-router-dom';

const Menu = () => {
	return (
		<div className={styles.menu}>
			<Link to={'/book'}>
				<div className={styles.item}>
					<img className={styles} src={book} alt="book"/>
				</div>
			</Link>
			<Link to={'/learn'}>
				<div className={styles.item}>
					<img src={list} alt="list"/>
				</div>
			</Link>
			<Link to={'/games'}>
				<div className={styles.item}>
					<img src={game} alt="game"/>
				</div>
			</Link>
			<Link to={'/stats'}>
				<div className={styles.item}>
					<img src={stat} alt="stat"/>
				</div>
			</Link>
			<Link to={'/settings'}>
				<div className={styles.item}>
					<img src={settings} alt="settings"/>
				</div>
			</Link>
		</div>
	);
};

export default Menu;