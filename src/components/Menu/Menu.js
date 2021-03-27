import React from 'react';
import styles from './Menu.module.scss';
import book from '@assets/img/book.png';
import list from '@assets/img/list.png';
import game from '@assets/img/game.png';
import stat from '@assets/img/stat.png';
import settings from '@assets/img/settings.png';
import { NavLink } from 'react-router-dom';

const Menu = () => {

	return (
		<div className={styles.menu}>
			<NavLink to={'/book'} exact activeClassName={styles.item_active}>
				<div className={styles.item}>
					<img className={styles} src={book} alt="book" />
				</div>
			</NavLink>
			<NavLink to={'/learn'} activeClassName={styles.item_active}>
				<div className={styles.item}>
					<img src={list} alt="list" />
				</div>
			</NavLink>
			<NavLink to={'/games'} activeClassName={styles.item_active}>
				<div className={styles.item}>
					<img src={game} alt="game" />
				</div>
			</NavLink>
			<NavLink to={'/stats'} activeClassName={styles.item_active}>
				<div className={styles.item}>
					<img src={stat} alt="stat" />
				</div>
			</NavLink>
			<NavLink to={'/settings'} activeClassName={styles.item_active}>
				<div className={styles.item}>
					<img src={settings} alt="settings" />
				</div>
			</NavLink>
		</div>
	);
};

export default Menu;