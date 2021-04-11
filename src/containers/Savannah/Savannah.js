import React, { useEffect, useState } from 'react';
import classes from './Savannah.module.scss';
import WordsList from '../../components/WordsList/WordsList';
import Hearts from '../../components/Hearts/Hearts';
import GameOver from '../../components/GameOver/GameOver';
import GameWin from '../../components/GameWin/GameWin';
import { getAllAggregatedWords } from '../../api/api';
import { getRandomNumber, playSound, shuffleList } from '../../utils/functions';
import { wrongSound, correctSound } from '../../utils/constants';
import Word from './Word/Word';

const Savannah = ({ words }) => {
	const fullLifes = 5;
	const wordsNumber = 30;
	const initWordTopPosition = 70;
	const [lifes, setLifes] = useState(fullLifes);
	const [gameStatus, setGameStatus] = useState('not-started');
	const [wordsPosition, setWordsPosition] = useState(initWordTopPosition);
	const [allWords, setAllWords] = useState([]);
	const [levelWords, setLevelWords] = useState();
	const [correctWord, setCorrectWord] = useState();
	const [soundsVolume, setSoundsVolume] = useState(1);
	const [guessedWords, setGuessedWords] = useState([]);
	const [notGuessedWords, setNotGuessedWords] = useState([]);

	useEffect(() => {
		startGame();
		return () => {
			setGameStatus('not-started');
		};
	}, []);

	useEffect(() => {
		if (allWords.length !== wordsNumber + 4) {
			startLevel();
		}
	}, [allWords]);


	useEffect(() => {
		if (guessedWords.length + notGuessedWords.length === wordsNumber) {
			setGameStatus('win');
		}
	}, [guessedWords, notGuessedWords]);

	useEffect(() => {
		if (!lifes) {
			setGameStatus('lose');
		}
	}, [lifes]);

	const startGame = async () => {
		const res = await getAllAggregatedWords(0, 0, 34, '{"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}');
		const resWords = shuffleList(res[0].paginatedResults);
		setGameStatus('started');
		setWordsPosition(initWordTopPosition);
		setAllWords(resWords);
		setLifes(fullLifes);
		setGuessedWords([]);
		setNotGuessedWords([]);
	};

	const startLevel = () => {
		const newCorrectWord = allWords[0];
		let newLevelWords = [newCorrectWord];
		while (newLevelWords.length < 4) {
			const newWord = allWords[getRandomNumber(0, allWords.length - 1)];
			if (newLevelWords.some(word => word._id === newWord._id)) continue;
			newLevelWords.push(newWord);
		}
		setCorrectWord(newCorrectWord);
		setLevelWords(shuffleList(newLevelWords));
		setAllWords(allWords.slice(1));
	};

	const changeWordStatus = guessedWord => {
		const isWordGuessed = guessedWord === correctWord.wordTranslate;
		let sound;
		if (isWordGuessed) {
			sound = correctSound;
			setWordsPosition(prev => prev - 1);
			setGuessedWords(prev => [...prev, guessedWord]);
		} else {
			sound = wrongSound;
			setLifes(prev => (prev > 0 ? prev - 1 : 0));
			setNotGuessedWords(prev => [...prev, correctWord]);
		}
		playSound(sound, soundsVolume);
		startLevel();
	};

	const handleKeyPress = event => {
		const { key } = event;
		if (key > 0 && key < 5) {
			const guessedWord = levelWords[event.key - 1].wordTranslate;
			changeWordStatus(guessedWord);
		}
	};

	const onChnageVolumeHandler = () => {
		setSoundsVolume(prev => (prev ? 0 : 1));
	};

	return (
		<div className={classes.screen} tabIndex={0} onKeyPress={handleKeyPress}>
			{gameStatus === 'started' && (
				<div>
					<div className={classes.sidebar}>
						<div className={classes.statistics}>
							Слов угадано: {guessedWords.length} / {wordsNumber}
						</div>
						<button className={classes.soundBtn} onClick={onChnageVolumeHandler}>
							{soundsVolume ? 'выкл' : 'вкл'}. звуки
						</button>
					</div>
					<Hearts hearts={lifes} />
					{correctWord && (
						<Word
							word={correctWord}
							wordFinishPosition={wordsPosition}
							isWordAnimated={gameStatus === 'started'}
							onFinishHandler={changeWordStatus}
						/>
					)}
					{levelWords && <WordsList onClick={changeWordStatus} words={levelWords} position={wordsPosition} />}
				</div>
			)}
			{gameStatus === 'lose' && <GameOver tryAgainHandler={startGame} />}
			{gameStatus === 'win' && <GameWin playAgainHandler={startGame} score={lifes} learnWords={notGuessedWords} />}
		</div>
	);
};

export default Savannah;
