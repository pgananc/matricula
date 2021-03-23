import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Grid } from 'semantic-ui-react';
import StudentService from 'app/api/studentService';
import useFetchStudent from 'app/hooks/useFetchStudent';
import PhotoUploadWidget from 'components/common/photoUpload/PhotoUploadWidget';
import StudentHeader from './StudentHeader';

const StudentProfile = ({ StudentId }) => {
	const [uploadingPhoto, setUploadingPhoto] = useState(false);
	const [StudentDetail, setStudentDetail] = useState(null);
	const [Student] = useFetchStudent(StudentId);

	useEffect(() => {
		setStudentDetail(Student);
	}, [Student]);

	const handleUploadImage = async (photo) => {
		setUploadingPhoto(true);
		try {
			const updatedStudent = await StudentService.uploadStudentPhoto(
				StudentId,
				photo
			);
			setStudentDetail(updatedStudent);
		} catch (error) {
			toast.error(error);
		} finally {
			setUploadingPhoto(false);
		}
	};

	return (
		<Grid>
			<Grid.Column width='16'>
				{StudentDetail && <StudentHeader student={StudentDetail} />}
				<PhotoUploadWidget
					loading={uploadingPhoto}
					uploadPhoto={handleUploadImage}
				/>
			</Grid.Column>
		</Grid>
	);
};

export default StudentProfile;
