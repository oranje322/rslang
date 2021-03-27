import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Menu from '../../components/Menu/Menu';
import styles from './Book.module.scss';

import FooterBackground from '../../components/FooterBackground/FooterBackground';

const Book = () => {
	return (
		<>
			<Header title={'Учебник'} />
			<div className={styles.bookBox}>
				<Menu />
				<h2>Выбирайте раздел и начинайте учиться!</h2>
				<div className={styles.bookModules}>
					<div className={styles.bookModules_wrapper}>
						{
							[1, 2, 3, 4, 5, 6].map((i) => {
								return <div key={i - 1} className={styles.bookModule}>
									<h3>Раздел {i}</h3>
									<button>
										<Link className={styles.link} to={`/words/${i}`}>Начать</Link>
									</button>
								</div>
							})}
					</div>
				</div>
				<FooterBackground />
				<Footer />
			</div>
		</>
	)
};

export default Book;
