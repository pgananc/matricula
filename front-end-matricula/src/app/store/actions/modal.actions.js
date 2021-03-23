import { MODAL_CLOSE, MODAL_OPEN } from './actionTypes';

export const openModal = (body, size, closeIcon) => {
	return {
		type: MODAL_OPEN,
		payload: { body, size, closeIcon },
	};
};

export const closeModal = () => {
	return {
		type: MODAL_CLOSE,
	};
};
