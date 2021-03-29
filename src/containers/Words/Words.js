import React, { useEffect, useState } from 'react';
import classes from './Words.module.scss';
import WordCard from '../../components/WordCard/WordCard';
import { createUserWord, getAllAggregatedWords, getWords } from '../../api/api';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Words = () => {
	const history = useHistory();
	const searchParams = new URLSearchParams(window.location.search);
	const [words, setWords] = useState();
	const [page, setPage] = useState(searchParams.get('page') ? searchParams.get('page') - 1 : 0);
	const isAuth = useSelector(state => state.auth.isAuth);
	const group = Number(window.location.pathname.replace('/book/', '')) - 1;

	useEffect(async () => {
		loadWords(group, page);
	}, []);

	const loadWords = async pageSide => {
		if (isAuth) {
			const res = await getAllAggregatedWords(
				group,
				page + pageSide,
				20,
				'{"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}'
			);
			setWords(res[0].paginatedResults);
		} else {
			const words = await getWords(group, page + pageSide);
			setWords(words);
		}
	};

	const setDifficultWord = (wordId, difficult) => {
		if (isAuth) {
			createUserWord(wordId, difficult).then(res => console.log(res));
		}
	};

	const onPageChangeHandler = pageSide => {
		searchParams.set('page', page + 1 + pageSide);
		history.push({ search: searchParams.toString() });
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
		<div className={classes.words}>
			{words ? pageControls : 'Загрузка...'}
			{words &&
				words.map(word => (
					<div id="wordContainer" className={classes.wordContainer} key={word._id}>
						<WordCard word={word} />
						<div className={classes.btnContainer}>
							<Button variant="outlined" onClick={() => setDifficultWord(word._id, 'easy')}>
								Удалить
							</Button>
							<Button
								variant={word?.userWord?.difficulty === 'hard' ? 'contained' : 'outlined'}
								color="secondary"
								onClick={() => setDifficultWord(word._id, 'hard')}>
								Сложно
							</Button>
						</div>
					</div>
				))}
			{words && pageControls}
		</div>
	);
};

export default Words;
