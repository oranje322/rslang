import React, { useState, Fragment } from 'react';
import classes from './Auth.module.scss';
import { Button, Input } from '@material-ui/core';
import defaultImg from '@assets/Avatar_default.png';
import validation from './validation';

const Auth = props => {
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
		photo: '',
	});
	const [errors, setErrors] = useState({});

	const onSubmitHandler = async event => {
		event.preventDefault();
		setIsFormSubmitted(true);
		console.log(formData);

		setErrors({ ...errors, name: validation('name', formData.name) });
		setErrors({ ...errors, password: validation('password', formData.password) });
	};

	const onChangeHandler = event => {
		const name = event.target.name;
		const value = event.target.value;
		setFormData({ ...formData, [name]: value });
		setErrors({ ...errors, [name]: validation(name, value) });
	};

	const onPhotoLoadHandler = event => {
		const file = event.target.files[0];
		console.log(file);

		if (file) {
			const photoError = validation('photo', file);
			console.log(photoError);
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
		setErrors([]);
		setIsFormSubmitted(false);
	};

	return (
		<Fragment>
			<h2 className={classes.title}>{isSignUp ? 'Зарегистрироваться' : 'Войти'}</h2>
			<form className={classes.form} onSubmit={onSubmitHandler} noValidate>
				{isSignUp && (
					<Input type="text" name="name" placeholder="Ваше имя" value={formData.name} onChange={onChangeHandler} />
				)}
				<Input type="email" name="email" placeholder="Почта" value={formData.email} onChange={onChangeHandler} />
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
				<p>
					Уже есть аккаунт?{' '}
					<span className={classes.changeAuthMethodBtn} onClick={changeAuthMethodHandler}>
						Войти
					</span>
				</p>
			) : (
				<p>
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
