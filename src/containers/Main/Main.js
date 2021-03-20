import React, { useState } from 'react';
import Auth from '../Auth/Auth';
import classes from './Main.module.scss';

const Main = () => {
	const [isAuthOpen, setIsAuthOpen] = useState(false);

	const onCloseAuthHandler = () => {
		setIsAuthOpen(false);
	};

	const onOpenAuthHandler = () => {
		setIsAuthOpen(true);
	};

	return (
		<div>
			<button onClick={onOpenAuthHandler}>auth</button>
			{isAuthOpen && <Auth closeAuth={onCloseAuthHandler} />}
		</div>
	);
};

export default Main;
