import React from 'react';
import './Learn.module.scss'
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import style from './Learn.module.scss';
import FooterBackground from '../../components/FooterBackground/FooterBackground';

const Learn = () => {
	return (
		<div>
			<Header title={'Изучение'} />
			<Menu />
			<div className={style.learnBox}>
				<h2>Здесь Вы можете выбрать категорию слов для изучения и просмотреть слова, которые Вы решили удалить.</h2>
				<div className={style.learnMain}>
					<div className={style.learnCard}>
						<h3>Активные слова</h3>
						<button>Проверить</button>
					</div>
					<div className={style.learnCard}>
						<h3>Сложные слова</h3>
						<button>Проверить</button>
					</div>
					<div className={style.learnCard}>
						<h3>Удаленные слова</h3>
						<button>Проверить</button>
					</div>
				</div>
			</div>
			<FooterBackground />
		</div>
	);
};

export default Learn;