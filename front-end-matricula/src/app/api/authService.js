import {
	getDecodedToken,
	removeToken,
	setToken,
} from 'app/config/auth/credentials';
import { AUTH_ENDPOINT, MENU_ENDPOINT } from 'app/core/appConstants';
import baseApi from './baseApi';

class AuthService {
	static login = async (credentials) => {
		try {
			const response = await baseApi.post(AUTH_ENDPOINT, credentials);
			if (response) {
				// set token on local storage
				setToken(response.token);
			}
		} catch (error) {
			throw error;
		}
	};

	static currentUser = () => getDecodedToken();

	static logout = () => removeToken();

	static getMenu = () => baseApi.get(MENU_ENDPOINT);
}
export default AuthService;
