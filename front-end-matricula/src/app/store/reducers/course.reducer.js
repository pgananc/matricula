import {
	LOADING_COURSE,
	LOADING_COURSES,
	FETCH_COURSE,
	FETCH_COURSES,
	UPDATE_COURSE,
	ADD_COURSE,
	DELETE_COURSE,
} from 'app/store/actions/actionTypes';

const initialState = {
	courses: [],
	course: null,
	loadignCourse: false,
	loadingCourses: false,
};

const loadingCourses = (state, payload) => {
	return { ...state, loadingCourses: payload.loading };
};

const loadingCourse = (state, payload) => {
	return { ...state, loadingCourse: payload.loading };
};

const fetchCourses = (state, payload) => {
	return { ...state, courses: payload.courses };
};

const fetchCourse = (state, payload) => {
	return { ...state, course: payload.course };
};

const addCourse = (state, payload) => {
	return { ...state, courses: payload.courses };
};

const updateCourse = (state, payload) => {
	return { ...state, courses: payload.courses };
};

const deleteCourse = (state, payload) => {
	return { ...state, courses: payload.courses };
};

const courseReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOADING_COURSES: {
			return loadingCourse(state, payload);
		}
		case LOADING_COURSES: {
			return loadingCourses(state, payload);
		}
		case FETCH_COURSE: {
			return fetchCourse(state, payload);
		}
		case FETCH_COURSES: {
			return fetchCourses(state, payload);
		}
		case ADD_COURSE: {
			return addCourse(state, payload);
		}
		case UPDATE_COURSE: {
			return updateCourse(state, payload);
		}
		case DELETE_COURSE: {
			return deleteCourse(state, payload);
		}
		default:
			return state;
	}
};

export default courseReducer;
