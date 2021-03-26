import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Menu from '../../components/Menu/Menu';
import styles from './Book.module.scss';
import FooterBackground from '../../components/FooterBackground/FooterBackground';

const Book = () => {
	return (
		<>
			<div className={styles.book}>
				<Header title={'Учебник'} />
				<Menu />
				<div className={styles.bookBox}>
					<h2>Выбирайте раздел и начинайте учиться!</h2>
					<div className={styles.bookModules}>
						{
							[1, 2, 3, 4, 5, 6].map((i) => {
								return <div key={i - 1} className={styles.bookModule}>
									<h3>Раздел {i}</h3>
									<button>Начать</button>
								</div>
							})
						}
					</div>
				</div>
				<FooterBackground />
				<Footer />
			</div>
		</>
	);
};

export default Book;