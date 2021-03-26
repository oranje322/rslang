import React, { useState } from 'react';
import CardGame from '../../components/MainCard/cardGame';
import CardOne from '../../components/MainCard/cardOne';
import CardStatistic from '../../components/MainCard/cardStatistic';
import logo from '@assets/img/logo.png';
import owl from '@assets/img/sova.png';
import styles from './Main.module.scss';
import Modal from '../../components/Modal/Modal';
import Auth from '../Auth/Auth';
import Footer from '../../components/Footer/Footer';

const Main = () => {

	const [isAuthOpen, setIsAuthModal] = useState(false);

	const onClickEnter = () => {
		setIsAuthModal(prev => !prev)
	}

	return (<>
		<div className={styles.container}>
			<header className={styles.header}>
				<img src={logo} alt="logo" className={styles.logoImg} />
				<button className={styles.loginBtn} onClick={onClickEnter}>Войти</button>
			</header>
			<main className={styles.main}>
				<img src={owl} alt="owl" className={styles.owl} />
				<p className={styles.title}>Узнавайте и тренируйте новые слова с RSlang</p>
				<div className={styles.cardsBlock}>
					<CardOne />
					<CardGame />
					<CardStatistic />
				</div>
			</main>
			<Footer />
		</div>
		{
			isAuthOpen && <Modal isModalShown={isAuthOpen} close={onClickEnter}>
				<Auth />
			</Modal>
		}
	</>

	);
};

export default Main;
