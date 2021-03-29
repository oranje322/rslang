import React, { Fragment } from 'react';
import Header from '../../components/Header/Header';
import styles from './Book.module.scss';
import { Link } from 'react-router-dom';

import FooterBackground from '../../components/FooterBackground/FooterBackground';

const Book = () => {
	const modules = [1, 2, 3, 4, 5, 6];

	return (
		<Fragment>
			<Header title={'Учебник'} />
			<div className={styles.bookBox}>
				<h2>Выбирайте раздел и начинайте учиться!</h2>
				<div className={styles.bookModules}>
					<div className={styles.bookModules_wrapper}>
						{modules.map(module => (
							<div key={module} className={styles.bookModule}>
								<h3>Раздел {module}</h3>
								<button>
									<Link className={styles.link} to={{ pathname: `/book/${module}`, search: 'page=1' }}>
										Начать
									</Link>
								</button>
							</div>
						))}
					</div>
				</div>
				<FooterBackground />
			</div>
		</Fragment>
	);
};

export default Book;
