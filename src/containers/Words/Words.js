import React, { useState, useEffect } from 'react';
import classes from './Words.module.scss';
import WordCard from '../../components/WordCard/WordCard';
import { getWords, getUserWords, updateUserWord } from '../../api/api';
import { Button } from '@material-ui/core';

const Dictionary = () => {
  const [words, setWords] = useState();
  const [page, setPage] = useState(0);
  const group = Number(window.location.pathname.replace('/words/', '')) -1;

	useEffect(async () => {
    loadWords(group, page);
	}, []);

  const loadWords = async () => {
    // getWords or getUserWords 
    const words = await getWords(group, page);
		setWords(words);
		setPage(prevPage => prevPage + 1);
    window.scroll(0,0);
  }

  const setDifficultWord = (wordId) => {
    const difficultWordIndex = words.findIndex(word => word.id === wordId);
    console.log(difficultWordIndex);

    let difficultWord = words[difficultWordIndex];
    difficultWord = {...difficultWord, difficult: !difficultWord.difficult};

    setWords([...words.slice(0, difficultWordIndex), difficultWord, ...words.slice(difficultWordIndex + 1)])

    updateUserWord("6057140e200af90015fe6da0", wordId)
  }

	return (
		<div className={classes.words}>
			{words && words.map(wordElem => (
        <div id="wordContainer" className={classes.wordContainer} key={wordElem.id}>
          <WordCard word={wordElem} />
          <div className={classes.btnContainer}>
            <Button variant="outlined">Удалить</Button>
            <Button variant={wordElem.difficult ? "contained" : "outlined"} color="secondary" onClick={() => setDifficultWord(wordElem.id)}>Сложно</Button>
          </div>
        </div>
			))}
      {words && <Button className={classes.nextBtn} variant="outlined" onClick={loadWords}>Следующие слова</Button>}
		</div>
	);
};

export default Dictionary;
