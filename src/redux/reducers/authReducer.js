export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


const initialState = {
	user: {},
	isAuth: false
};

const temp = JSON.parse(localStorage.getItem('userData'));
const previousState = temp ? {
	user: {
		name: temp.name,
		photo: temp.photo,
		userId: temp.userId
	},
	isAuth: true
} : initialState;

export const authReducer = (state = previousState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				user: {
					name: action.payload.name,
					photo: action.payload.photo,
					userId: action.payload.userId
				},
				isAuth: true
			};
		case LOGOUT:
			return {
				...state,
				user: {},
				isAuth: false
			};
		default:
			return state;
	}
};