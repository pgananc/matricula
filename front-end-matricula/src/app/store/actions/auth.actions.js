import { toast } from 'react-toastify';

import * as actionTypes from './actionTypes';
import { closeModal } from './modal.actions';
import history from '../../..';
import AuthService from 'app/api/authService';

const loginUser = () => {
	return { type: actionTypes.LOGIN_USER };
};

const setCurrentUser = (currentUser) => {
	return {
		type: actionTypes.CURRENT_USER,
		payload: { currentUser },
	};
};

const signOutUser = () => {
	return { type: actionTypes.LOGOUT_USER };
};

const setMenu = (menus) => {
	return { type: actionTypes.FETCH_MENU, payload: { menus } };
};

export const getUser = () => (dispatch) => {
	try {
		const user = AuthService.currentUser();
		dispatch(setCurrentUser(user));
	} catch (error) {
		toast.error(error);
	}
};

export const fetchMenu = () => async (dispatch) => {
	try {
		const menus = await AuthService.getMenu();
		dispatch(setMenu(menus));
	} catch (error) {
		toast.error(error);
	}
};

export const login = (crendentials) => async (dispatch) => {
	try {
		await AuthService.login(crendentials);
		dispatch(loginUser());
		dispatch(getUser());
		dispatch(fetchMenu());
		dispatch(closeModal());
		toast.success('Bienvenido a Matriculación');
	} catch (error) {
		throw error;
	}
};

export const logout = () => (dispatch) => {
	try {
		AuthService.logout();
		dispatch(signOutUser());
		history.push('/');
	} catch (error) {
		toast.error(error);
	}
};
