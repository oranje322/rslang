import React from 'react';
import styles from './Header.module.scss'
import avatar from '@assets/Avatar_default.png';
import { useSelector } from 'react-redux';

const Header = ({title}) => {
	const {name, photo} = useSelector(state => state.auth.user)

	return (
		<div className={styles.header}>
			<p className={styles.title}>{title}</p>
			<div className={styles.user}>
				<img className={styles.avatar} src={photo || avatar} alt="avatar"/>
				<p className={styles.username}>{name || 'noname'}</p>
			</div>
		</div>
	);
};

export default Header;