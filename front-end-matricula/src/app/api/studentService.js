import { STUDENTS_ENDPOINT } from 'app/core/appConstants';
import baseApi from './baseApi';

const getStudentUrl = (id) => `${STUDENTS_ENDPOINT}/${id}`;

class StudentService {
	static fetchStudents = () => baseApi.get(STUDENTS_ENDPOINT);

	static fetchStudent = (id) => baseApi.get(getStudentUrl(id));

	static addStudent = (student) => baseApi.post(STUDENTS_ENDPOINT, student);

	static updateStudent = (student) =>
		baseApi.put(getStudentUrl(student.id), student);

	static removeStudent = (id) => baseApi.delete(getStudentUrl(id));

	static uploadStudentPhoto = (id, photo) =>
		baseApi.postForm(`${STUDENTS_ENDPOINT}/subir/${id}`, photo);
}

export default StudentService;
