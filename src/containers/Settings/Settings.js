import React from 'react';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import styles from './Settings.module.scss';
const Settings = () => {

	const settingsCheck = [
		['del', 'Показывать кнопку Удалить'],
		['diff', 'Показывать кнопку Удалить'],
		['trWord', 'Показывать перевод слов'],
		['trSentence', 'Показывать перевод предложений']
	]
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
				<FormControlLabel
					classes={{
						label: styles.label,
					}}
					control={<Checkbox checked={state.diff} onChange={handleChange} name="diff" color="primary" />}
					label="Показывать кнопку Сложные"
				/>
				<FormControlLabel
					classes={{
						label: styles.label,
					}}
					control={<Checkbox checked={state.del} onChange={handleChange} name="del" color="primary" />}
					label="Показывать кнопку Удалить"
				/>
				<FormControlLabel
					control={<Checkbox checked={state.trWord} onChange={handleChange} name="trWord" color="primary" />}
					label="Показывать перевод слов"
				/>
				<FormControlLabel
					control={<Checkbox checked={state.trSentence} onChange={handleChange} name="trSentence" color="primary" />}
					label="Показывать перевод предложений"
				/>
			</div>
		</div>
	);
};

export default Settings;
