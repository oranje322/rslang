import React from 'react';
import styles from './Header.module.scss'
import avatar from '@assets/img/Avatar_default.png';
import { useSelector } from 'react-redux';
import Logo from '@assets/img/sova.png';
import { Link } from 'react-router-dom';

const Header = ({ title }) => {
	const { name, photo } = useSelector(state => state.auth.user)

	return (
		<div className={styles.header}>
			<div className={styles.wrapper}>
				<Link to='/'>
					<img className={styles.logo} src={Logo} alt="Logo" />
				</Link>
				<p className={styles.title}>{title}</p>
			</div>
			<div className={styles.user}>
				<img className={styles.avatar} src={photo || avatar} alt="avatar" />
				<p className={styles.username}>{name || 'noname'}</p>
			</div>
		</div>
	);
};

export default Header;