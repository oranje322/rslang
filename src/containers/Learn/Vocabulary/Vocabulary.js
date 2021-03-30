import React, { Fragment, useEffect, useState } from 'react';
import classes from './Vocabulary.module.scss';
import WordCard from '../../../components/WordCard/WordCard';
import Preloader from '../../../components/Preloader/Preloader';

import { createUserWord, deleteUserWord, getAllAggregatedWords, getWords, updateUserWord } from '../../../api/api';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import { setWordsAC } from '../../../redux/actions/WordsActions';

const Vocabulary = () => {
	// const history = useHistory();
	// const searchParams = new URLSearchParams(window.location.search);
	const [words, setWords] = useState();
	// const [page, setPage] = useState(searchParams.get('page') ? searchParams.get('page') - 1 : 0);
	const isAuth = useSelector(state => state.auth.isAuth);
	// const group = Number(window.location.pathname.replace('/book/', '')) - 1;

	const dispatch = useDispatch()

	const route = useRouteMatch();

	const [group, setGroup] = useState(0)
	const [page, setPage] = useState(0)

	useEffect(async () => {
		loadWords(group, page);
	}, [page]);

	useEffect(() => {
		if(words?.length > 0) {
			dispatch(setWordsAC(words))
		}
	}, [words])


	//велосипед зарефакторить)
	useEffect(() => {
		if(words?.length === 0 && page !== 0) {
			setPage(prev => prev -1)
		}
	}, [words])


	// const state = useSelector(state => state.settings);

	const loadWords = async pageSide => {
		if (isAuth) {
			if (route.path === '/learn/active') {
				const res = await getAllAggregatedWords(
					group,
					page + pageSide,
					20,
					'{"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}'
				);
				setWords(res[0].paginatedResults);
			}
			if (route.path === '/learn/hard') {
				const res = await getAllAggregatedWords(
					group,
					page + pageSide,
					20,
					'{"$or":[{"userWord.difficulty":"hard"}]}'
				);
				setWords(res[0].paginatedResults);
			}
			if (route.path === '/learn/delete') {
				const res = await getAllAggregatedWords(
					group,
					page + pageSide,
					20,
					'{"$or":[{"userWord.difficulty":"easy"}]}'
				);
				setWords(res[0].paginatedResults);
			}

		} else {
			const words = await getWords(group, page + pageSide);
			setWords(words);
		}
	};

	const setDifficultWord = async (word, difficult) => {
		if (!isAuth) return;

		if (word.userWord && !difficult) {
			await deleteUserWord(word._id);
		} else if (word.userWord && word.userWord.difficulty !== difficult) {
			await updateUserWord(word._id, difficult);
		} else {
			await createUserWord(word._id, difficult);
		}
		loadWords(0);
	};

	const onPageChangeHandler = pageSide => {
		setPage(prevPage => prevPage + pageSide);
		loadWords(pageSide);
	};

	const pageControls = (
		<div className={classes.pageControls}>
			<Button
				className={classes.prevBtn}
				disabled={page === 0}
				variant="outlined"
				onClick={() => onPageChangeHandler(-1)}>
				Назад
			</Button>
			<p className={classes.page}>Страница {page + 1}</p>
			<Button
				className={classes.nextBtn}
				disabled={words && words.length === 0}
				variant="outlined"
				onClick={() => onPageChangeHandler(1)}>
				Вперед
			</Button>
		</div>
	);

	return (
		<Fragment>
			<Header title={'Учебник'}/>
			<div className={classes.words}>
				{words ? pageControls : <Preloader/>}
				{words &&
				words.map(word => (
					<div id="wordContainer" className={classes.wordContainer} key={word._id}>
						<WordCard word={word}/>
						{isAuth && (
							<div className={classes.btnContainer}>
								{route.path === '/learn/delete' ?
									<Button variant="outlined" onClick={() => setDifficultWord(word)}>
										Восстановить
									</Button> :
									<Button variant="outlined" onClick={() => setDifficultWord(word, 'easy')}>
										Удалить
									</Button>
								}
								<Button
									variant={word.userWord?.difficulty === 'hard' ? 'contained' : 'outlined'}
									color="secondary"
									onClick={() => setDifficultWord(word, word.userWord?.difficulty ? '' : 'hard')}>
									Сложно
								</Button>

							</div>
						)}
					</div>
				))}
				{words && pageControls}
			</div>
		</Fragment>
	);
};

export default Vocabulary;
