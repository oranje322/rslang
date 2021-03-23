export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


const initialState = {
	user: {},
	isAuth: false
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				user: action.payload,
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