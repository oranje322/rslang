import React, { useState, useEffect, Fragment } from 'react';
import classes from './Auth.module.scss';
import { Button, Input } from '@material-ui/core';
import defaultImg from '@assets/img/Avatar_default.png';
import validation from './validation';
import { useDispatch } from 'react-redux';
import { loginAC } from '../../redux/actions/authActions';
import { signIn, signUp } from '../../api/api';
import { useHistory } from 'react-router';

const Auth = props => {
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const [formData, setFormData] = useState({ email: '', password: '', name: '', photo: '' });
	const [errors, setErrors] = useState({});

	const history = useHistory()
	const dispatch = useDispatch()

	useEffect(() => {
		if (isSignUp) {
			setFormData({
				email: '',
				password: '',
				name: '',
				photo: '',
			});
		} else {
			setFormData({
				email: '',
				password: '',
			});
		}
		setErrors([]);
		setIsFormSubmitted(false);
	}, [isSignUp]);

	const onSubmitHandler = async event => {
		event.preventDefault();
		setIsFormSubmitted(true);

		if (
			validation('name', formData.name) ||
			validation('password', formData.password) ||
			validation('email', formData.email)
		) {
			setErrors({
				...errors,
				name: validation('name', formData.name),
				email: validation('email', formData.email),
				password: validation('password', formData.password),
			});
			return;
		}

		try {
			if (isSignUp) {
				const data = await signUp(formData);
				setIsSignUp(false);
			} else {
				const data = await signIn(formData);
				dispatch(loginAC(data))
				history.push('/book')
			}
			setErrors({});
		} catch (err) {
			if (err.response?.data?.error) {
				setErrors({ ...errors, server: err.response?.data?.error?.errors.map(err => err.message) });
			} else if (err.response?.data) {
				setErrors({ ...errors, server: err.response?.data });
			} else {
				setErrors({ ...errors, server: err.message });
			}
		}
	};

	const onChangeHandler = event => {
		const name = event.target.name;
		const value = event.target.value;
		setFormData({ ...formData, [name]: value });
		setErrors({ ...errors, [name]: validation(name, value) });
	};

	const onPhotoLoadHandler = event => {
		const file = event.target.files[0];

		if (file) {
			const photoError = validation('photo', file);
			setErrors({ ...errors, photo: photoError });
			if (!photoError) {
				const reader = new FileReader();
				reader.onloadend = function () {
					if (typeof reader.result === 'string') {
						setFormData({ ...formData, photo: reader.result });
					} else {
						setFormData({ ...formData, photo: '' });
					}
				};
				reader.readAsDataURL(file);
			}
		}
	};

	const changeAuthMethodHandler = () => {
		setIsSignUp(!isSignUp);
	};

	return (
		<Fragment>
			<h2 className={classes.title}>{isSignUp ? 'Зарегистрироваться' : 'Войти'}</h2>
			<form className={classes.form} onSubmit={onSubmitHandler} noValidate>
				<Input type="email" name="email" placeholder="Почта" value={formData.email} onChange={onChangeHandler} />
				{isSignUp && (
					<Input type="text" name="name" placeholder="Ваше имя" value={formData.name} onChange={onChangeHandler} />
				)}
				<Input
					type="password"
					name="password"
					placeholder="Пароль"
					value={formData.password}
					onChange={onChangeHandler}
				/>

				{isSignUp && (
					<div className={classes.uploadBtn}>
						<label htmlFor="upload-photo">
							<input
								style={{ display: 'none' }}
								id="upload-photo"
								name="upload-photo"
								type="file"
								accept=".jpg, .jpeg, .png"
								onChange={event => onPhotoLoadHandler(event)}
							/>
							<Button variant="outlined" component="span">
								Загрузить фото
							</Button>
							<img src={formData.photo ? formData.photo : defaultImg} width="38" alt="" title="Ваше фото" />
						</label>
					</div>
				)}

				{Object.values(errors).length > 0 && isFormSubmitted && (
					<p className={classes.errorText}>{Object.values(errors).join('\r\n')}</p>
				)}

				<Button className={classes.submitBtn} type="submit">
					Подтвердить
				</Button>
			</form>

			{isSignUp ? (
				<p className={classes.text}>
					Уже есть аккаунт?{' '}
					<span className={classes.changeAuthMethodBtn} onClick={changeAuthMethodHandler}>
						Войти
					</span>
				</p>
			) : (
				<p className={classes.text}>
					Еще нет аккаунта?{' '}
					<span className={classes.changeAuthMethodBtn} onClick={changeAuthMethodHandler}>
						Зарегистрироваться
					</span>
				</p>
			)}
		</Fragment>
	);
};

export default Auth;
