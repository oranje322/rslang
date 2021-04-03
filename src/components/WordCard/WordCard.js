import React, { useEffect, useRef } from 'react';
import { Card, IconButton } from '@material-ui/core';
import HearingIcon from '@material-ui/icons/Hearing';
import classNames from 'classnames/bind';
import classes from './WordCard.module.scss';
import { useSelector } from 'react-redux';

let cx = classNames.bind(classes);

const WordCard = ({ word }) => {
	const link = 'https://rslang-db.herokuapp.com/';
	const textMeaningRef = useRef();
	const textExampleRef = useRef();
	const audio = new Audio(link + word.audio);
	const audioExample = new Audio(link + word.audioExample);
	const audioMeaning = new Audio(link + word.audioMeaning);
	const allAudio = [audio, audioMeaning, audioExample]
	let playing = false;

	const state = useSelector(state => state.settings);

	useEffect(() => {
		textMeaningRef.current.innerHTML = word.textMeaning;
		textExampleRef.current.innerHTML = word.textExample;
	}, []);

	const cardClass = cx({
		card: true,
		['color' + word.group]: true,
		difficult: word?.userWord?.difficulty === 'hard'
	});

	const listen = () => {
		if (!playing) {
			for (let i = 0; i < allAudio.length; i++) {
				playing = true;
				if (i === 0) {
					allAudio[i].play()
				} else {
					allAudio[i - 1].onended = () => {
						allAudio[i].play()
						allAudio.slice(1)
					};
				}
			}
		}
	};

	return (
		<Card className={cardClass} elevation={8}>
			<img className={classes.img} src={link + word.image} />
			<div className={classes.textContainer}>
				<h4>
					{word.word} <span className={classes.transcription}>{word.transcription}</span>
					<IconButton onClick={listen} className={classes.listenBtn} aria-label="listen">
						<HearingIcon />
					</IconButton>
				</h4>
				{state.wordTranslation && <h5 className={classes.wordTranslate}>{word.wordTranslate}</h5>}
				<div className={classes.textDescription}>
					<p>
						<span ref={textMeaningRef}>{word.textMeaning}</span>
						<br />
						{state.sentenceTranslation && <span className={classes.textTranstalion}>{word.textMeaningTranslate}</span>}
					</p>
					<p>
						<span ref={textExampleRef}>{word.textExample}</span>
						<br />
						{state.sentenceTranslation && <span className={classes.textTranstalion}>{word.textExampleTranslate}</span>}
					</p>
				</div>
			</div>
		</Card>
	);
};

export default WordCard;
