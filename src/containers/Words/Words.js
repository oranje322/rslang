import React, { useEffect, useState } from 'react';
import classes from './Words.module.scss';
import WordCard from '../../components/WordCard/WordCard';
import { createUserWord, getAllAggregatedWords, getWords } from '../../api/api';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';

const Dictionary = () => {
	const [words, setWords] = useState();
	const [page, setPage] = useState(0);
	const [wordsPerPage, setWordsPerPage] = useState(20);
	const isAuth = useSelector(state => state.auth.isAuth);
	const group = Number(window.location.pathname.replace('/words/', '')) - 1;

	useEffect(async () => {
		loadWords(group, page);
	}, []);
	console.log(words)

	const loadWords = async () => {
		// getWords or getUserWords
		if (isAuth) {
			const res = await getAllAggregatedWords(group,
				page,
				wordsPerPage,
				'{"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}'
			);
			setWords(res[0].paginatedResults);
			setPage(prevPage => prevPage + 1);
		} else {
			const words = await getWords(group, page);
			setWords(words);
			setPage(prevPage => prevPage + 1);
		}
		window.scroll(0, 0);
	};

	const setDifficultWord = (wordId, index, difficult, wordElem) => {
		console.log(wordElem)
		// const difficultWordIndex = words.findIndex(word => word.id === wordId);
		// console.log(difficultWordIndex);

		if (isAuth) {
			createUserWord(wordId, difficult).then(res => console.log(res));
		}

		// let difficultWord = words[index];
		// difficultWord = { ...difficultWord, difficult: !difficultWord.difficult };
		// setWords([...words.slice(0, index), difficultWord, ...words.slice(index + 1)]);


	};

	return (
		<div className={classes.words}>
			{words && words.map((wordElem, index) => (
				<div id="wordContainer" className={classes.wordContainer} key={wordElem.id}>
					<WordCard word={wordElem} />
					<div className={classes.btnContainer}>
						<Button variant="outlined"
							onClick={() => setDifficultWord(wordElem.id, index, 'easy', wordElem)}>Удалить</Button>
						<Button variant={wordElem?.userWord?.difficulty === 'hard' ? 'contained' : 'outlined'} color="secondary"
							onClick={() => setDifficultWord(wordElem.id, 'hard')}>Сложно</Button>
					</div>
				</div>
			))}
			{words && <Button className={classes.nextBtn} variant="outlined" onClick={loadWords}>Следующие слова</Button>}
		</div>
	);
};

export default Dictionary;
