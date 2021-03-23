import { REGISTRATION_ENDPOINT } from 'app/core/appConstants';
import baseApi from './baseApi';

class RegistrationService {
	static fetchRegistrations = () => baseApi.get(REGISTRATION_ENDPOINT);

	static fetchRegistration = (id) => baseApi.get(`${REGISTRATION_ENDPOINT}/${id}`);

	static createRegistration = (registration) => baseApi.post(REGISTRATION_ENDPOINT, registration);

	static fetchRegistrationsByFilters = (searchParams) =>
		baseApi.post(`${REGISTRATION_ENDPOINT}/buscar`, searchParams);
	
	static deleteRegistration = async (id) => baseApi.delete(`${REGISTRATION_ENDPOINT}/${id}`);
}

export default RegistrationService;
