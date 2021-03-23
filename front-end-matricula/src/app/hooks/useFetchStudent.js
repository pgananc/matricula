import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import StudentService from '../api/studentService';

const useFetchStudent = (id) => {
	const [Student, setStudent] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		if (id)
			StudentService.fetchStudent(id)
				.then((response) => {
					setStudent(response);
				})
				.catch((error) => {
					toast.error(error);
				});
		setLoading(false);
	}, [id]);

	return [Student, loading];
};

export default useFetchStudent;
