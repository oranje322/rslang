import React from 'react';
import classes from '../../components/WordCard/WordCard.module.scss';
import HearingIcon from '@material-ui/icons/Hearing';
import { IconButton } from '@material-ui/core';

const AudioComponent = ({ audioLink }) => {
	const link = 'https://rslang-db.herokuapp.com/';
	const audio = new Audio(link + audioLink);
	const listen = () => {
		audio.play();
	};

	return (
		<IconButton onClick={listen} className={classes.listenBtn} aria-label="listen">
			<HearingIcon/>
		</IconButton>
	);
};

export default AudioComponent;