import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://rslang-db.herokuapp.com/',
});

const config = {
	headers: {
		'Content-Type': 'application/json',
	},
};

export async function signin(data) {
	const body = JSON.stringify(data);
	const res = await instance.post('/signin', body, config);
	return res.data;
}

export async function signup(data) {
	const body = JSON.stringify(data);
	const res = await instance.post('/users', body, config);
	return res.data;
}
