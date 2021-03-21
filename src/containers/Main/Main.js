import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Auth from '../Auth/Auth';
import classes from './Main.module.scss';
import Modal from '../../components/Modal/Modal';

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
			<Modal isModalShown={isAuthOpen} close={onCloseAuthHandler}>
				<Auth />
			</Modal>
		</div>
	);
};

export default Main;
