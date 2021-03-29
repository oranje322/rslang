import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import styles from './Book.module.scss';
import Words from '../Words/Words';
import { useHistory } from 'react-router-dom';

import FooterBackground from '../../components/FooterBackground/FooterBackground';

const Book = () => {
  const history = useHistory();
  const [isModuleOpen, setIsModuleOpen] = useState(false);
  const modules = [1, 2, 3, 4, 5, 6];

	const onChangeModuleHandler = module => {
		history.push(`/book/${module}?page=1`);
    setIsModuleOpen(true);
	};

  useEffect(() => {
    const bookModule = window.location.pathname.replace(/\/book\/*/, '');
    setIsModuleOpen(bookModule !== '');
  }, []);

	return (
		<Fragment>
			<Header title={'Учебник'} />
			{isModuleOpen ? (
				<Words />
			) : (
				<div className={styles.bookBox}>
					<h2>Выбирайте раздел и начинайте учиться!</h2>
					<div className={styles.bookModules}>
						<div className={styles.bookModules_wrapper}>
							{modules.map(module => (
								<div key={module} className={styles.bookModule}>
									<h3>Раздел {module}</h3>
									<button onClick={() => onChangeModuleHandler(module)}>Начать</button>
								</div>
							))}
						</div>
					</div>
					<FooterBackground />
				</div>
			)}
		</Fragment>
	);
};

export default Book;
