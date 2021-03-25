import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://rslang-db.herokuapp.com/'
});

export async function signIn(data) {
	const res = await instance.post('/signin', data);
	localStorage.setItem('userData', JSON.stringify(res.data));
	return res.data;
}

export async function signUp(data) {
	const res = await instance.post('/users', data);
	return res.data;
}

export async function getNewToken() {
	const data = JSON.parse(localStorage.getItem('userData'));
	const res = await instance.get(`/users/${data.userId}/tokens`, {
		headers: {
			Authorization: `Bearer ${data.refreshToken}`
		}
	});
	localStorage.setItem('userData', JSON.stringify({...data, ...res.data}))
}


