import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://rslang-db.herokuapp.com/'
});

instance.interceptors.response.use(res => res, error => {
	if (error.response.status === 401) {
		const data = JSON.parse(localStorage.getItem('userData'));
		instance.get(`/users/${data.userId}/tokens`, {
			headers: {
				Authorization: `Bearer ${data.refreshToken}`
			}
		}).then(res => {
			console.log(res.data);
			const data = JSON.parse(localStorage.getItem('userData'));
			localStorage.setItem('userData', JSON.stringify({ ...data, ...res.data }));

		}).catch(e => {
			localStorage.removeItem('userData');
			window.location = '/';
		});
	} else {
		throw error;
	}
});


//auth
export async function signIn(data) {
	const res = await instance.post('/signin', data);
	localStorage.setItem('userData', JSON.stringify(res.data));
	return res.data;
}

export async function signUp(data) {
	const res = await instance.post('/users', data);
	return res.data;
}

//token
export async function getNewToken() {
	const data = JSON.parse(localStorage.getItem('userData'));
	const res = await instance.get(`/users/${data.userId}/tokens`, {
		headers: {
			Authorization: `Bearer ${data.refreshToken}`
		}
	});
	localStorage.setItem('userData', JSON.stringify({ ...data, ...res.data }));
}


//words
export async function getWords(group = 0, page = 0) {
	const res = await instance.get(`/words?group=${group}&page=${page}`);
	return res.data;
}


// user/words
export async function getUserWords() {
	const { token, userId } = JSON.parse(localStorage.getItem('userData'));
	const res = await instance.get(`/users/${userId}/words`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	return res.data;
}

export async function createUserWord(wordId) {
	const body = {
		difficulty: 'hard'
	};
	const { token, userId } = JSON.parse(localStorage.getItem('userData'));
	const res = await instance.post(`/users/${userId}/words/${wordId}`, body, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	console.log(res.data);
	return res.data;
}

export async function getWordById(wordId) {
	const { token, userId } = JSON.parse(localStorage.getItem('userData'));
	const res = await instance.get(`/users/${userId}/words/${wordId}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	return res.data;
}

export async function updateUserWord(wordId) {
	const body = {
		difficulty: 'hard'
	};
	const { token, userId } = JSON.parse(localStorage.getItem('userData'));
	const res = await instance.put(`/users/${userId}/words/${wordId}`, body, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	return res.data;
}

export async function deleteUserWord(wordId) {
	const { token, userId } = JSON.parse(localStorage.getItem('userData'));
	const res = await instance.delete(`/users/${userId}/words/${wordId}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	return res.data;
}