import { COURSES_ENDPOINT } from 'app/core/appConstants';
import baseApi from './baseApi';

const getCourseUrl = (id) => `${COURSES_ENDPOINT}/${id}`;

class CourseService {
	static fetchCourses = async () => baseApi.get(COURSES_ENDPOINT);

	static fetchCourse = async (id) => baseApi.get(getCourseUrl(id));

	static addCourse = async (course) => baseApi.post(COURSES_ENDPOINT, course);

	static updateCourse = async (course) => baseApi.put(getCourseUrl(course.id), course);

	static deleteCourse = async (id) => baseApi.delete(getCourseUrl(id));
}

export default CourseService;
