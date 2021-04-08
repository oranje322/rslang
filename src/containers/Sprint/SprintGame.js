import React, { useEffect, useState } from 'react';
import styles from './Sprint.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { clickAnswer } from '../../redux/thunk/sprintThunk';
import { CircularProgressWithLabel } from './Spinner';
import { setFinishedSprint } from '../../redux/actions/sprintActions';


let cn = classNames.bind(styles);

const SprintGame = () => {
	const { score, winStreak, loadPair, rate } = useSelector(state => state.sprint);

	const [timer, setTimer] = useState(60);

	useEffect(() => {
		const timerID = setTimeout(() => {
			if (timer > 0) setTimer(prev => prev - 1);
		}, 1000);
		return () => clearTimeout(timerID);
	}, [timer]);

	useEffect(() => {
		if (timer === 0) dispatch(setFinishedSprint());
	}, [timer]);

	const dispatch = useDispatch();

	document.onkeydown = (e) => {
		if (e.key === 'ArrowRight') {
			dispatch(clickAnswer(true));
		}
		if (e.key === 'ArrowLeft') {
			dispatch(clickAnswer(false));
		}
	};

	const onClickAnswer = (answer) => {
		dispatch(clickAnswer(answer));
	};

	const circleClass1 = cn({
		circle: true,
		active: winStreak % 4 >= 1
	});

	const circleClass2 = cn({
		circle: true,
		active: winStreak % 4 >= 2
	});

	const circleClass3 = cn({
		circle: true,
		active: winStreak % 4 >= 3
	});


	return (
		<div className={styles.game}>
			<div className={styles.gameHeader}>
				<div className={styles.timer}>
					<CircularProgressWithLabel value={timer}/>
				</div>
				<div className={styles.score}>{score}</div>
			</div>
			<div className={styles.content}>
				<div className={styles.circles}>
					<div className={circleClass1}></div>
					<div className={circleClass2}></div>
					<div className={circleClass3}></div>
				</div>
				<div className={styles.scorePerWords}>{`+${10 * rate} очков за слово`}</div>
				<div className={styles.words}>
					<p className={styles.word}>{loadPair?.word}</p>
					<p className={styles.word}>{loadPair?.translate}</p>
				</div>
				<div className={styles.buttons}>
					<button onClick={() => onClickAnswer(false)} className={styles.wrongBtn}> ← Неверно</button>
					<button onClick={() => onClickAnswer(true)} className={styles.successBtn}> Верно →</button>
				</div>
			</div>
		</div>
	);
};

export default SprintGame;