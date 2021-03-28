import React, { useEffect, useRef } from 'react';
import { Card, IconButton } from '@material-ui/core';
import HearingIcon from '@material-ui/icons/Hearing';
import classNames from 'classnames/bind';
import classes from './WordCard.module.scss';

let cx = classNames.bind(classes);

const WordCard = ({ word }) => {
	const link = 'https://rslang-db.herokuapp.com/';
	const textMeaningRef = useRef();
	const textExampleRef = useRef();
	const audio = new Audio(link + word.audio);
	const audioExample = new Audio(link + word.audioExample);
	const audioMeaning = new Audio(link + word.audioMeaning);

	useEffect(() => {
		textMeaningRef.current.innerHTML = word.textMeaning;
		textExampleRef.current.innerHTML = word.textExample;
	}, []);

	const cardClass = cx({
		card: true,
		['color' + word.group]: true,
		difficult: word?.userWord?.difficulty
	});

	const listen = () => {
		audio.play();
	};

	return (
		<Card className={cardClass} elevation={8}>
			<img className={classes.img} src={link + word.image}/>
			<div className={classes.textContainer}>
				<h4>
					{word.word} <span className={classes.transcription}>{word.transcription}</span>
					<IconButton onClick={listen} className={classes.listenBtn} aria-label="listen">
						<HearingIcon/>
					</IconButton>
				</h4>
				<h5 className={classes.wordTranslate}>{word.wordTranslate}</h5>
				<div className={classes.textDescription}>
					<p>
						<span ref={textMeaningRef}>{word.textMeaning}</span>
						<br/>
						<span className={classes.textTranstalion}>{word.textMeaningTranslate}</span>
					</p>
					<p>
						<span ref={textExampleRef}>{word.textExample}</span>
						<br/>
						<span className={classes.textTranstalion}>{word.textExampleTranslate}</span>
					</p>
				</div>
			</div>
		</Card>
	);
};

export default WordCard;
