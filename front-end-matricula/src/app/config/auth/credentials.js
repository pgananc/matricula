// @ts-nocheck
import jwtDecode from 'jwt-decode';
import { TOKEN_KEY } from 'app/core/appConstants';

export const setToken = (token) => {
	if (token) {
		localStorage.setItem(TOKEN_KEY, token);
	}
};

export const getJwt = () => localStorage.getItem(TOKEN_KEY);

export const getDecodedToken = () => {
	try {
		return jwtDecode(getJwt());
	} catch (error) {
		return null;
	}
};

export const removeToken = () => {
	localStorage.removeItem(TOKEN_KEY);
};

const getUserRole = () => {
	return getDecodedToken().roles[0];
};

export const isAllowed = (options, menu) => {
	let allowed;

	options.forEach((option) => {
		// validar que el rol del usuario exista dentro del arreglo de roles del menu y luego validar que haga match el nombre del Path
		if (option.roles.includes(getUserRole()) && option.nombre === menu) {
			allowed = true;
		}
	});

	return allowed;
};
