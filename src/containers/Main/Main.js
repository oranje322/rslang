import React, { useState } from 'react';
import CardGame from '../../components/MainCard/cardGame';
import CardOne from '../../components/MainCard/cardOne';
import CardStatistic from '../../components/MainCard/cardStatistic';
import logo from '@assets/img/logo.png';
import owl from '@assets/img/sova.png';
import styles from './Main.module.scss';
import Modal from '../../components/Modal/Modal';
import Auth from '../Auth/Auth';

const Main = () => {

	const [isAuthOpen, setIsAuthModal] = useState(false);

	const onClickEnter = () => {
		setIsAuthModal(prev => !prev)
	}

	return (<>
			<div className={styles.container}>
				<header className={styles.header}>
					<img src={logo} alt="logo" className={styles.logoImg}/>
					<button className={styles.loginBtn} onClick={onClickEnter}>Войти</button>
				</header>
				<main className={styles.main}>
					<img src={owl} alt="owl" className={styles.owl}/>
					<p className={styles.title}>Узнавайте и тренируйте новые слова с RSlang</p>
					<div className={styles.cardsBlock}>
						<CardOne/>
						<CardGame/>
						<CardStatistic/>
					</div>
				</main>
				<footer className={styles.footer}>
					<div className={styles.git}>
						<a href="https://github.com/oranje322" target="_blank" rel="noreferrer"> @oranje322</a>
						<a href="https://github.com/kristinand" target="_blank" rel="noreferrer"> @kristinand</a>
						<a href="https://github.com/ya-stefaniya" target="_blank" rel="noreferrer"> @ya-stefaniya</a>
						<a href="https://github.com/zaruba2004" target="_blank" rel="noreferrer"> @zaruba2004</a>
					</div>
					<div className={styles.course}>
						<a className={styles.link} href={'https://rs.school/js/'} target="_blank" rel="noreferrer">
							<img className={styles.img} src="https://rs.school/images/rs_school_js.svg" alt="rsschhol"/>
							<span>/ 2021</span>
						</a>
					</div>
				</footer>
			</div>
			{
				isAuthOpen && <Modal isModalShown={isAuthOpen} close={onClickEnter}>
					<Auth/>
				</Modal>
			}
			</>

	);
};

export default Main;
