import React, { useState } from 'react';
import Auth from '../Auth/Auth';
import Modal from '../../components/Modal/Modal';
import { getNewToken } from '../../api/api';

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
			<button onClick={() => getNewToken()}>refresh</button>
			<Modal isModalShown={isAuthOpen} close={onCloseAuthHandler}>
				<Auth/>
			</Modal>
		</div>
	);
};

export default Main;
