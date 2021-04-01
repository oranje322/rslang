import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import styles from './Settings.module.scss';
import { deleteButton, difficultButton, wordTranslation, sentenceTranslation } from '../../redux/actions/settingsActions';

const Settings = () => {

	const settingsCheck = [
		{
			text: 'Показывать кнопку Удалить',
			id: 'deleteButton'
		},
		{
			text: 'Показывать кнопку Cложно',
			id: 'difficultButton',
		},
		{
			text: 'Показывать перевод слов',
			id: 'wordTranslation'
		},
		{
			text: 'Показывать перевод предложений',
			id: 'sentenceTranslation'
		}
	];

	const dispatch = useDispatch();
	const state = useSelector(state => state.settings);

	const handleChange = (event) => {
		let target = event.target.name;
		if (target === 'deleteButton') {
			dispatch(deleteButton());
		} else if (target === 'difficultButton') {
			dispatch(difficultButton());
		} else if (target === 'wordTranslation') {
			dispatch(wordTranslation());
		} else if (target === 'sentenceTranslation') {
			dispatch(sentenceTranslation());
		}
	};
	return (
		<div>
			<Header title={'Настройки'} />
			<div className={styles.wrapper}>
				{settingsCheck.map(variant => (
					<FormControlLabel
						classes={{
							label: styles.label,
						}}
						key={variant.id}

						control={<Checkbox checked={state[variant.id]} onChange={handleChange} name={variant.id} color="primary" />}
						label={variant.text}
					/>
				))}
			</div>
		</div>
	);
};

export default Settings;
