import { LOGIN, LOGOUT } from '../reducers/authReducer';

export const loginAC = (payload) => ({ type: LOGIN, payload });
export const logoutAC = () => ({ type: LOGOUT });