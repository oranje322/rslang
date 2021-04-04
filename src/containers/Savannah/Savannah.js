import React, { useEffect, useState } from 'react';
import classes from './Savannah.module.scss';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import WordsList from '../../components/WordsList/WordsList';
import Hearts from '../../components/Hearts/Hearts';
import GameOver from '../../components/GameOver/GameOver';
import GameCountdown from '../../components/GameCountdown/GameCountdown';
import { getAllAggregatedWords } from '../../api/api';
import { getRandomNumber } from './functions';
import Word from './Word/Word';
import GameWin from '../../components/GameWin/GameWin';

const Savannah = () => {
  const correctSound = new Audio('http://soundimage.org/wp-content/uploads/2016/04/UI_Quirky1.mp3');
  const wrongSound = new Audio('http://soundimage.org/wp-content/uploads/2016/04/UI_Quirky33.mp3');
  const fullLifes = 5;
  const winStats = 30;
	const [lifes, setLifes] = useState(fullLifes);
	const [gameStatus, setGameStatus] = useState('not-started');
	const [wordsPosition, setWordsPosition] = useState('70%');
	const [allWords, setAllWords] = useState();
	const [levelWords, setLevelWords] = useState();
	const [correctWord, setCorrectWord] = useState();
	const [statistics, setStatistics] = useState(0);
	

	useEffect(() => {
    startGame();
	}, []);

	// word guessed
	useEffect(() => {
		if (allWords && statistics < winStats) {
			startLevel();
		} else if (statistics === winStats) {
			// todo: game win
			setGameStatus('win');
		}
	}, [allWords, statistics]);

	useEffect(() => {
		if (!lifes) {
			setGameStatus('lose');
		}
	}, [lifes]);

  const startGame = async () => {
		const res = await getAllAggregatedWords(0, 0, 34, '{"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}');
		const resWords = res[0].paginatedResults;
    setTimeout(() => {
      setGameStatus('started');
      setWordsPosition('70%');
      setAllWords(resWords);
      setLifes(fullLifes);
      setStatistics(0);
    }, 3000);
  }

	const startLevel = () => {
		let newLevelWords = [];
		while (newLevelWords.length < 4) {
			const newWord = allWords[getRandomNumber(0, allWords.length - 1)];
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
    wrongSound.currentTime = 0;
    wrongSound.play();
		setLifes(prev => prev > 0 ? prev - 1 : 0);
		startLevel();
	};

	const guessed = () => {
    correctSound.currentTime = 0;
    correctSound.play();
		setWordsPosition(prev => {
			const prevNumber = parseInt(prev);
			return prevNumber - 1 + '%';
		});
		setStatistics(prev => prev + 1);
		const newAllWords = allWords.filter(word => word._id !== correctWord._id);
		setAllWords(newAllWords);
	};

  const handleKeyPress = (event) => {
    const { key } = event;
    if (key > 0 && key < 5) {
      const guessedWord = levelWords[event.key - 1].wordTranslate;
      onChangeWordStatus(guessedWord);
    }
  }

	return (
		<div className={classes.screen} tabIndex={0} onKeyPress={handleKeyPress}>
			<Header title={'Саванна'} />
      {gameStatus === 'not-started' && <GameCountdown />}
			{gameStatus === 'started' && (
				<div>
					<div className={classes.statistics}>Слов угадано: {statistics} / {winStats}</div>
					<Hearts hearts={lifes} />
					{correctWord && (
						<Word
							word={correctWord}
							wordFinishPosition={parseInt(wordsPosition)}
							isWordAnimated={gameStatus === 'started'}
							onFinishHandler={onChangeWordStatus}
						/>
					)}
					{levelWords && <WordsList onClick={onChangeWordStatus} words={levelWords} position={wordsPosition} />}
				</div>
			)}
			{gameStatus === 'lose' && <GameOver tryAgainHandler={startGame} />}
			{gameStatus === 'win' && <GameWin playAgainHandler={startGame} score={lifes} />}
		</div>
	);
};

export default Savannah;
