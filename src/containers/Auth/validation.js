export default function validation(name, value) {
	if (value === undefined) return;
	let error;
	if (name === 'name' && value.trim().length < 3) {
		console.log(name, value.length);
		return 'Имя должно содержать не менее 3 символов';
	} else if (name === 'password' && value.length < 8) {
		return 'Пароль должен содержать не менее 8 символов';
	} else if (
		name === 'password' &&
		!value.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%#*?&]{8,}/)
	) {
		return 'Пароль должен содержать как минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ @$#!%*?&';
	} else if (name === 'photo' && !value.type.match(/^image\/\w*$/)) {
		return 'Можно загрузить только картинку';
	} else if (name === 'photo' && value.size / 1024 / 1024 > 1) {
		return 'Превышен максимально допустимый размер файла 1МБ';
	}
	return error;
}
