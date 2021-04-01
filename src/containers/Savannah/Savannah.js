import React, { useEffect, useState } from 'react';
import classes from './Savannah.module.scss';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import WordsList from '../../components/WordsList/WordsList';
import Hearts from '../../components/Hearts/Hearts';
import { getAllAggregatedWords } from '../../api/api';
import { getRandomNumber } from './functions';
import Word from './Word/Word';

const Savannah = () => {
	const [lifes, setLifes] = useState(5);
	const [isGamePlayed, setIsGamePlayed] = useState(false);
	const [wordsPosition, setWordsPosition] = useState('70%');
	const [allWords, setAllWords] = useState();
	const [levelWords, setLevelWords] = useState();
	const [correctWord, setCorrectWord] = useState();
	const [statistics, setStatistics] = useState(0);
	const winStats = 30;

	useEffect(async () => {
		const res = await getAllAggregatedWords(0, 0, 34, '{"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}');
		const resWords = res[0].paginatedResults;
		setAllWords(resWords);
	}, []);

	// word guessed
	useEffect(() => {
		if (allWords && statistics < winStats) {
			startLevel();
			setIsGamePlayed(true);
		} else {
			// todo: game win
			setIsGamePlayed(false);
		}
	}, [allWords, statistics]);

	useEffect(() => {
		if (!lifes) {
			// todo: game over
			setIsGamePlayed(false);
		}
	}, [lifes]);

	const startLevel = () => {
		let newLevelWords = [];
		while (newLevelWords.length < 4) {
			const newWord = allWords[getRandomNumber(0, allWords.length)];
			if (newLevelWords.some(word => word._id === newWord._id)) continue;
			newLevelWords.push(newWord);
		}
		setLevelWords(newLevelWords);
		setCorrectWord(newLevelWords[getRandomNumber(0, 3)]);
	};

	const onChangeWordStatus = guessedWord => {
		const isWordGuessed = guessedWord === correctWord.wordTranslate;
		if (isWordGuessed) {
			guessed();
		} else {
			notGuessed();
		}
	};

	const notGuessed = () => {
		// todo: audio sounds
		setLifes(prev => prev - 1);
		startLevel();
	};

	const guessed = () => {
		// todo: audio sounds
		setWordsPosition(prev => {
			const prevNumber = parseInt(prev);
			return prevNumber - 1 + '%';
		});
		setStatistics(prev => prev + 1);
		const newAllWords = allWords.filter(word => word._id !== correctWord._id);
		setAllWords(newAllWords);
	};

	return (
		<div>
			<Header title={'Саванна'} />
			<Menu />
			{lifes ? (
				<div>
					<div>Слов угадано: {statistics}</div>
					<Hearts hearts={lifes} />
					{correctWord && (
						<Word
							word={correctWord}
							wordFinishPosition={parseInt(wordsPosition)}
							isWordAnimated={isGamePlayed}
							onFinishHandler={onChangeWordStatus}
						/>
					)}
					{levelWords && <WordsList onClick={onChangeWordStatus} words={levelWords} position={wordsPosition} />}
				</div>
			) : (
				<p>Вы проиграли</p> // todo: game over screen
			)}
			{statistics === winStats && <p>Вы выиграли</p> /* todo: game win screen */}
		</div>
	);
};

export default Savannah;
