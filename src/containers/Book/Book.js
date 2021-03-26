import React from 'react';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import styles from './Book.module.scss'

const Book = () => {
	return (
		<div className={styles.book}>
			<Header title={'Учебник'}/>
			<Menu/>
		</div>
	);
};

export default Book;