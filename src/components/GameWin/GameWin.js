import React from 'react';
import classes from './GameWin.module.scss';
import { useHistory } from 'react-router-dom';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

const GameWin = props => {
	const history = useHistory();
	const { width, height } = useWindowSize();
	const backToGamesHandler = () => {
		history.push('/games');
	};

	return (
		<div className={classes.screen}>
			<Confetti width={width} height={height} />
			<h3>Ура, вы прошли игру!</h3>
			<p>Набрано очков: {props.score}</p>
			{props.unknownWords.length && (
				<div>
					<p>Слова, которые нужно повторить:</p>
					{props.unknownWords.map(word => (
						<p key={word.word}>{word.word} - {word.wordTranslate}</p>
					))}
				</div>
			)}
			<div className={classes.btnContainer}>
				<button className={classes.btn} onClick={backToGamesHandler}>
					Назад к играм
				</button>
				<button className={classes.btn} onClick={props.playAgainHandler}>
					Сыграть еще раз
				</button>
			</div>
		</div>
	);
};

export default GameWin;
