import React, { Fragment, useEffect } from 'react';
import classes from './Words.module.scss';
import WordCard from '../../components/WordCard/WordCard';
import Preloader from '../../components/Preloader/Preloader';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { loadWordsThunk, setDifficultyWordsThunk } from '../../redux/thunk/wordsThunk';
import { setGroup, setPage } from '../../redux/actions/WordsActions';

const Words = () => {
	const { module, page } = useParams();
	const { group } = useSelector(state => state.words);
	const words = useSelector(state => state.words.activeWords);
	const isAuth = useSelector(state => state.auth.isAuth);
	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(setGroup(module - 1));
		dispatch(setPage(+page));
	}, [module]);

	useEffect(() => {
		dispatch(loadWordsThunk());
	}, [page, group]);

	const state = useSelector(state => state.settings);

	const pageControls = (
		<div className={classes.pageControls}>
			<Link disabled to={`/book/module${module}/page${+page - 1}`}>
				<Button
					className={classes.prevBtn}
					disabled={+page === 1}
					variant="outlined"
					onClick={() => dispatch(setPage(+page - 1))}>
					Назад
				</Button>
			</Link>

			<p className={classes.page}>Страница {page}</p>
			<Link to={`/book/module${module}/page${+page + 1}`}>
				<Button
					className={classes.nextBtn}
					disabled={words && words.length !== 20}
					variant="outlined"
					onClick={() => dispatch(setPage(+page + 1))}>
					Вперед
				</Button>
			</Link>
		</div>
	);

	return (
		<Fragment>
			<Header title={'Учебник'} />
			<div className={classes.words}>
				{words ? pageControls : <Preloader />}
				{words &&
					words.map(word => (
						<div id="wordContainer" className={classes.wordContainer} key={word._id}>
							<WordCard word={word} />
							{isAuth && (
								<div className={classes.btnContainer}>
									{state.deleteButton &&
										<Button variant="outlined" onClick={() => dispatch(setDifficultyWordsThunk(word, 'easy'))}>
											Удалить
								</Button>
									}
									{state.difficultButton &&
										<Button
											variant={word.userWord?.difficulty === 'hard' ? 'contained' : 'outlined'}
											color="secondary"
											onClick={() => dispatch(setDifficultyWordsThunk(word, word.userWord?.difficulty ? null : 'hard'))}>
											Сложно
										</Button>
									}
								</div>
							)}
						</div>
					))}
			</div>
		</Fragment>
	);
};

export default Words;
