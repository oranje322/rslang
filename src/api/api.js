import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://rslang-db.herokuapp.com/',
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
			Authorization: `Bearer ${data.refreshToken}`,
		},
	});
	localStorage.setItem('userData', JSON.stringify({ ...data, ...res.data }));
}

export async function getWords(group = 0, page = 0) {
	const res = await instance.get(`/words?group=${group}&page=${page}`);
	return res.data;
}

export async function getUserWords(userId) {
	const res = await instance.get(`/users/${userId}/words`);
	return res.data;
}

export async function updateUserWord(userId, wordId) {
	const body = {
		difficulty: 'hard',
	};
	const data = JSON.parse(localStorage.getItem('userData'));
	const { token } = JSON.parse(localStorage.getItem('userData'));
	const res = await instance.post(`/users/${userId}/words/${wordId}`, body, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return res.data;
}
