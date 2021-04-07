import React, { useEffect } from 'react';
import styles from './Sprint.module.scss';
import sprinter from '@assets/img/sprinter.svg';
import { useDispatch, useSelector } from 'react-redux';
import { loadWordsForSprint, startSprint } from '../../redux/thunk/sprintThunk';
import { setLevel } from '../../redux/actions/sprintActions';

const SprintInfo = () => {

	const { words, level, from } = useSelector(state => state.sprint);

	useEffect(() => {
		dispatch(loadWordsForSprint());
	}, [level]);

	const dispatch = useDispatch();

	const onClickStart = () => {
		dispatch(startSprint());
	};

	const onChangeLevel = (lvl) => {
		if (lvl >= 0 && lvl <= 5) {
			dispatch(setLevel(lvl));
		}
	};

	return (
		<div className={styles.info}>
			<div className={styles.titleBlock}>
				<img className={styles.sprinter} src={sprinter} alt="sprinter"/>
				<h3>СПРИНТ</h3>
			</div>
			<p className={styles.text}>
				Укажите, верно ли указан перевод слова?
			</p>
			<p>Вы можете использовать клавиши ← → или мышь.</p>
			{
				from === 'menu' && <div className={styles.lvlBlock}>
					<p className={styles.lvlTitle}>Уровень</p>
					<div className={styles.lvl}>
						<span onClick={() => onChangeLevel(level - 1)}>-</span>
						<span style={{ cursor: 'inherit' }}>{level + 1}</span>
						<span onClick={() => onChangeLevel(level + 1)}>+</span>
					</div>
				</div>
			}

			<button disabled={words.length === 0} onClick={onClickStart} className={styles.button}>
				Начать
			</button>
		</div>
	);
};

export default SprintInfo;