import React, { Fragment, useEffect } from 'react';
import classes from './Vocabulary.module.scss';
import WordCard from '../../../components/WordCard/WordCard';
import Preloader from '../../../components/Preloader/Preloader';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../components/Header/Header';
import { loadEasyWordsThunk, loadHardWordsThunk, setDifficultyWordsThunk } from '../../../redux/thunk/wordsThunk';
import { setGroup, setPage } from '../../../redux/actions/WordsActions';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { setFrom } from '../../../redux/actions/sprintActions';
import { setFromGames } from '../../../redux/actions/gamesActions';


const Vocabulary = () => {
	const history = useHistory()
	const words = useSelector(state => state.words.activeWords);
	const isAuth = useSelector(state => state.auth.isAuth);
	const dispatch = useDispatch();
	const { active, page } = useParams();
	const currentPage = useSelector(state => state.words.currentPage)
	const totalCount = useSelector(state => state.words.totalCount)

	useEffect(() => {
		dispatch(setPage(page - 1));
		dispatch(setGroup(0));
	}, [active, page]);

	useEffect(() => {
		if (words.length === 0 && currentPage !== 0) {
			dispatch(setPage(currentPage - 1))
			history.push(`/learn/${active}/page${currentPage}`)
		}
	}, [words])

	useEffect(() => {
		loadWords()
	}, [currentPage]);

	const loadWords = () => {
		if (active === 'hard') {
			dispatch(loadHardWordsThunk());
		}
		if (active === 'delete') {
			dispatch(loadEasyWordsThunk());
		}
	}


	const onClickToSprint = () => {
		dispatch(setFrom('book'))
		history.push('/games/sprint')
	}
	const onClickToSpeak = () => {
		dispatch(setFromGames('book'))
		history.push('/games/mygame')
	}
	const onClickToSavannah = () => {
		dispatch(setFromGames('book'))
		history.push('/games/savannah')
	}

	const state = useSelector(state => state.settings);

	const pageControls = (
		<div className={classes.pageControls}>
			<Link className={+page === 1 ? classes.disable : ''} to={`/learn/${active}/page${+page - 1}`}>
				<Button
					className={classes.prevBtn}
					disabled={+page === 1}
					variant="outlined"
					onClick={() => dispatch(setPage(currentPage - 1))}>
					Назад
				</Button>
			</Link>
			<p className={classes.page}>Страница {currentPage + 1}</p>
			<Link className={totalCount - (page * 20) <= 0 ? classes.disable : ''} to={`/learn/${active}/page${+page + 1}`}>
				<Button
					className={classes.nextBtn}
					disabled={totalCount - (page * 20) <= 0}
					variant="outlined"
					onClick={() => dispatch(setPage(currentPage + 1))}>
					Вперед
				</Button>
			</Link>
		</div>
	);
	return (
		<Fragment>
			<Header title={'Учебник'} />
			<div className={classes.menuToGames}>
				<p>Тренировать слова в играх</p>
				<div className={classes.allBtn}>
					<button className={classes.toGames} onClick={onClickToSprint}>Спринт</button>
					<button className={classes.toGames} onClick={onClickToSpeak}>Поговорим</button>
					<button className={classes.toGames} onClick={onClickToSavannah}>Саванна</button>
				</div>
			</div>
			<div className={classes.words}>
				{words ? pageControls : <Preloader />}
				{words &&
					words.map(word => (
						<div id="wordContainer" className={classes.wordContainer} key={word._id}>
							<WordCard word={word} />
							{isAuth && (
								<div className={classes.btnContainer}>
									{state.deleteButton &&
										active === 'delete' ? <Button variant="outlined"
											onClick={() => dispatch(setDifficultyWordsThunk(word, word.userWord?.difficulty ? null : 'easy', active))}>
											Восстановить
									</Button> :
										<Button variant="outlined"
											onClick={() => dispatch(setDifficultyWordsThunk(word, word.userWord?.difficulty ? null : 'easy', active))}>
											Удалить
									</Button>
									}
									{state.difficultButton && word.userWord?.difficulty !== 'easy' && word.userWord?.difficulty !== 'hard' &&
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
	)
		;
};

export default Vocabulary;
