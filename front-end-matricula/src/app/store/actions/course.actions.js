import { toast } from 'react-toastify';
import * as actionTypes from './actionTypes';
import CourseService from 'app/api/courseService';
import { closeModal } from './modal.actions';

const loadingCourses = (loading) => {
	return { type: actionTypes.LOADING_COURSES, payload: { loading } };
};

const loadingCourse = (loading) => {
	return { type: actionTypes.LOADING_COURSE, payload: { loading } };
};

const fecthCoursesAction = (courses) => {
	return { type: actionTypes.FETCH_COURSES, payload: { courses } };
};

const fetchCourseAction = (course) => {
	return { type: actionTypes.FETCH_COURSE, payload: { course } };
};

const addCourseAction = (courses) => {
	return { type: actionTypes.ADD_COURSE, payload: { courses } };
};

const updateCourseAction = (courses) => {
	return { type: actionTypes.UPDATE_COURSE, payload: { courses } };
};

const deleteCourseAction = (courses) => {
	return { type: actionTypes.DELETE_COURSE, payload: { courses } };
};

export const fetchCourses = () => async (dispatch) => {
	dispatch(loadingCourses(true));
	try {
		const courses = await CourseService.fetchCourses();

		dispatch(fecthCoursesAction(courses));
	} catch (error) {
		toast.error('Problema al cargar cursos');
	} finally {
		dispatch(loadingCourses(false));
	}
};

export const fetchCourse = (id) => async (dispatch) => {
	dispatch(loadingCourse(true));
	try {
		const course = await CourseService.fetchCourse(id);

		dispatch(fetchCourseAction(course));
	} catch (error) {
		toast.error('Problema al cargar cursos');
	} finally {
		dispatch(loadingCourse(false));
	}
};

export const addCourse = (course) => async (dispatch, getState) => {
	dispatch(loadingCourse(true));
	try {
		const newCourse = await CourseService.addCourse(course);
		const courses = [...getState().course.courses];
		courses.push(newCourse);

		// Actualizamos el estado global
		dispatch(addCourseAction(courses));
		dispatch(closeModal());

		toast.success('Curso agregado exitosamente');
	} catch (error) {
		toast.error('Problema al agregar curso');
	} finally {
		dispatch(loadingCourse(false));
	}
};

export const updateCourse = (course) => async (dispatch, getState) => {
	dispatch(loadingCourse(true));
	try {
		const updatedCourse = await CourseService.updateCourse(course);

		const courses = [...getState().course.courses];
		const index = courses.findIndex((a) => a.id === updatedCourse.id);
		courses[index] = updatedCourse;

		dispatch(updateCourseAction(courses));

		dispatch(closeModal());
	} catch (error) {
		toast.error('Problema al actualizar curso.');
	} finally {
		dispatch(loadingCourse(false));
	}
};

export const deleteCourse = (id) => async (dispatch, getState) => {
	dispatch(loadingCourse(true));
	try {
		await CourseService.deleteCourse(id);
		let courses = [...getState().course.courses];

		courses = courses.filter((a) => a.id !== id);

		dispatch(deleteCourseAction(courses));
		toast.info('Curso eliminado correctamente.');
	} catch (error) {
		toast.error('Problema al eliminar curso.');
	} finally {
		dispatch(loadingCourse(false));
	}
};
