import { MODAL_CLOSE, MODAL_OPEN } from 'app/store/actions/actionTypes';

const initialState = {
	open: false,
	body: null,
	size: null,
	closeIcon: false,
};

const openModal = (state, payload) => {
	return {
		...state,
		open: true,
		body: payload.body,
		size: payload.size,
		closeIcon: payload.closeIcon,
	};
};

const closeModal = () => {
	return {
		open: false,
		body: null,
		size: null,
	};
};

const modalReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case MODAL_OPEN: {
			return openModal(state, payload);
		}
		case MODAL_CLOSE: {
			return closeModal();
		}

		default:
			return state;
	}
};

export default modalReducer;
