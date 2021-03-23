import {
	LOGIN_USER,
	LOGOUT_USER,
	CURRENT_USER,
	FETCH_MENU,
} from 'app/store/actions/actionTypes';

const initialState = {
	currentUser: null,
	authenticated: false,
	menus: [],
};

const loginUser = (state) => {
	return {
		...state,
	};
};

const setCurrentUser = (state, payload) => {
	return {
		...state,
		currentUser: payload.currentUser,
		authenticated: true,
	};
};

const signOutUser = () => {
	return {
		currentUser: null,
		authenticated: false,
	};
};

const fetchMenu = (state, payload) => {
	return {
		...state,
		menus: payload.menus,
	};
};

const authReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOGIN_USER: {
			return loginUser(state);
		}
		case LOGOUT_USER: {
			return signOutUser();
		}
		case CURRENT_USER: {
			return setCurrentUser(state, payload);
		}
		case FETCH_MENU: {
			return fetchMenu(state, payload);
		}
		default:
			return state;
	}
};

export default authReducer;
