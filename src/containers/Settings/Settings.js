import React from 'react';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import styles from './Settings.module.scss';
const Settings = () => {

	const settingsCheck = [
		{
			text: 'Показывать кнопку Удалить',
			id: 'del',
		},
		{
			text: 'Показывать кнопку Cложно',
			id: 'diff',
		},
		{
			text: 'Показывать перевод слов',
			id: 'trWord',
		},
		{
			text: 'Показывать перевод предложений',
			id: 'trSent',
		}
	];

	const [state, setState] = React.useState({
		del: true,
		diff: true,
		trWord: true,
		trSentence: true
	});

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};
	return (
		<div>
			<Header title={'Настройки'} />
			<Menu />
			<div className={styles.wrapper}>
				{settingsCheck.map(variant => (
					<FormControlLabel
						classes={{
							label: styles.label,
						}}
						key={variant.id}
						value={variant.id}
						control={<Checkbox checked={state.del} onChange={handleChange} name={variant.id} color="primary" />}
						label={variant.text}
					/>
				))}
			</div>
		</div>
	);
};

export default Settings;
