// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
	Breadcrumb,
	Button,
	Container,
	Divider,
	Grid,
	Header,
	Icon,
	Popup,
	Segment,
	Table,
} from 'semantic-ui-react';

import StudentService from 'app/api/studentService';
import useFetchStudents from 'app/hooks/useFetchStudents';
import { closeModal, openModal } from 'app/store/actions/modal.actions';
import LoadingComponent from 'components/common/LoadingComponent';
import StudentForm from 'components/students/StudentForm';
import StudentProfile from 'components/students/StudentProfile';

const Students = () => {
	const [StudentsList, setStudentsList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingAction, setLoadingAction] = useState(false);

	const [Students] = useFetchStudents();

	const dispatch = useDispatch();

	useEffect(() => {
		setLoading(true);
		if (Students) {
			setStudentsList(Students);
			setLoading(false);
		}
	}, [Students]);

	const handleCreateorEdit = async (values) => {
		const StudentsUpdatedList = [...StudentsList];
		try {
			// Update Student
			if (values.id) {
				const updatedStudent = await StudentService.updateStudent(values);
				const index = StudentsUpdatedList.findIndex((a) => a.id === values.id);
				StudentsUpdatedList[index] = updatedStudent;
				toast.info('Estudiante actualizado.');
			} else {
				// New Student
				const Student = {
					nombres: values.nombres,
					apellidos: values.apellidos,
					dni: values.dni,
					edad: values.edad,
				};
				const newStudent = await StudentService.addStudent(Student);
				StudentsUpdatedList.push(newStudent);
				toast.success('Estudiante creado.');
			}
			setStudentsList(StudentsUpdatedList);
		} catch (error) {
			toast.error(error);
		} finally {
			dispatch(closeModal());
		}
	};

	const handleDeleteStudent = async (id) => {
		setLoadingAction(true);
		try {
			let StudentsUpdatedList = [...StudentsList];
			await StudentService.removeStudent(id);
			StudentsUpdatedList = StudentsUpdatedList.filter((a) => a.id !== id);
			setStudentsList(StudentsUpdatedList);
			toast.info('Estudiante eliminado.');
		} catch (error) {
			toast.error(error);
		} finally {
			setLoadingAction(false);
		}
	};

	let StudentsArea = <h4>No results</h4>;

	if (StudentsList && StudentsList.length > 0) {
		StudentsArea = (
			<Table>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell width='5'>Nombre</Table.HeaderCell>
						<Table.HeaderCell width='2'>Apellido</Table.HeaderCell>
						<Table.HeaderCell width='2'>Dni</Table.HeaderCell>
						<Table.HeaderCell width='2'>Edad</Table.HeaderCell>
						<Table.HeaderCell width='4' />
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{StudentsList.map((Student) => (
						<Table.Row key={Student.id}>
							<Table.Cell>{Student.nombres}</Table.Cell>
							<Table.Cell>{Student.apellidos}</Table.Cell>
							<Table.Cell>{Student.dni}</Table.Cell>
							<Table.Cell>{Student.edad}</Table.Cell>
							<Table.Cell>
								<Popup
									inverted
									content='Actualización estudiante.'
									trigger={
										<Button
											color='violet'
											icon='edit'
											loading={loadingAction}
											onClick={() =>
												dispatch(
													openModal(
														<StudentForm
															studentId={Student.id}
															submitHandler={handleCreateorEdit}
														/>
													)
												)
											}
										/>
									}
								/>
								<Popup
									inverted
									content='Estudiante eliminado'
									trigger={
										<Button
											color='red'
											icon='trash'
											loading={loadingAction}
											onClick={() => handleDeleteStudent(Student.id)}
										/>
									}
								/>
								<Popup 
									inverted
									content='Upload Photo'
									trigger={
										<Button disabled
											color='vk'
											icon='cloud upload'
											loading={loadingAction}
											onClick={() =>
												dispatch(
													openModal(
														<StudentProfile StudentId={Student.id} />,
														'large',
														true
													)
												)
											}
										/>
									}
								/>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		);
	}

	if (loading) return <LoadingComponent content='Loading estudiantes...' />;

	return (
		<Segment>
			<Breadcrumb size='small'>
				<Breadcrumb.Section>Resource</Breadcrumb.Section>
				<Breadcrumb.Divider icon='right chevron' />
				<Breadcrumb.Section active>Estudiantes</Breadcrumb.Section>
			</Breadcrumb>
			<Divider horizontal>
				<Header as='h4'>
					<Icon name='list alternate outline' />
					Lista Estudiantes
				</Header>
			</Divider>
			<Segment>
				<Button
					size='large'
					content='Nuevo estudiante'
					icon='add user'
					color='purple'
					onClick={() => {
						dispatch(
							openModal(<StudentForm submitHandler={handleCreateorEdit} />)
						);
					}}
				/>
			</Segment>
			<Container textAlign='center'>
				<Grid columns='3'>
					<Grid.Column width='3' />
					<Grid.Column width='10'>{StudentsArea}</Grid.Column>
					<Grid.Column width='3' />
				</Grid>
			</Container>
		</Segment>
	);
};

export default Students;
