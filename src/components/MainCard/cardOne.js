import React from 'react';
import levelImg from '../../assets/img/levelImg.png';
import classes from './cardMain.scss';
import { Link } from 'react-router-dom';


const CardOne = () => {
	let { cardBox, violet, buttonBox } = classes;
	return (
		<div className={`${violet} ${cardBox}`}>
			<h2>Готовые наборы</h2>
			<p> выбирайте тему и уровень сложности</p>
			<div className={classes.box}>
				<img src={levelImg} alt='startImg'/>
				<div className={buttonBox}>
					<Link to={'/book'}>
						<button>Начать</button>
					</Link>
				</div>
			</div>

		</div>
	);
};
export default CardOne;