import React, { useEffect } from 'react';
import styles from './Sprint.module.scss';
import Header from '../../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import SprintInfo from './SprintInfo';
import SprintGame from './SprintGame';
import { loadWordsForSprint } from '../../redux/thunk/sprintThunk';
import SprintStats from './SprintStats';


const Sprint = () => {
	const { isStarted, isFinished } = useSelector(state => state.sprint);
	const dispatch = useDispatch()




	return (
		<>
			<Header title={'Спринт'}/>
			<div className={styles.sprint}>
				{
					!isStarted && !isFinished && <SprintInfo/>
				}
				{
					isStarted && <SprintGame/>
				}
				{
					!isStarted && isFinished && <SprintStats/>
				}

			</div>
		</>
	);
};

export default Sprint;