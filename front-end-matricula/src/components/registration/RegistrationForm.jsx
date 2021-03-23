// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { combineValidators, isRequired } from 'revalidate';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import useFetchStudents from 'app/hooks/useFetchStudents';
import { fetchCourses } from 'app/store/actions/course.actions';
import { Button, Form, Grid, Header, Popup, Table } from 'semantic-ui-react';
import TextAreaInput from 'components/ui/TextAreaInput';
import SelectedInput from 'components/ui/SelectedInput';
import ErrorMessage from 'components/ui/ErrorMessage';
import RegistrationService from 'app/api/registrationService';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const validate = combineValidators({
	
	estudiante: isRequired(''),
	curso: isRequired(''),
});

const RegistrationForm = () => {
	const history = useHistory();
	const { loading, courses } = useSelector((state) => {
		const courses = [];

		if (state.course.courses && state.course.courses.length > 0) {
			state.course.courses.forEach((item) => {
				const course = {
					key: item.id,
					text: item.nombre,
					value: item.id,
				};
				courses.push(course);
			});
		}

		return {
			loading: state.course.loadingCourses,
			courses,
		};
	});

	const dispatch = useDispatch();
	const [Students] = useFetchStudents();
	const [StudentsList, setStudentsList] = useState([]);
	const [loadingStudents, setLoadingStudents] = useState(true);
	const [items, setItems] = useState([]);
	const [item, setItem] = useState(null);

	useEffect(() => {
		if (courses.length === 0) {
			dispatch(fetchCourses());
		}
		setLoadingStudents(true);
		if (Students) {
			const StudentsList = [];
			Students.forEach((item) => {
				const Student = {
					key: item.id,
					text: `${item.nombres} ${item.apellidos}`,
					value: item.id,
				};
				StudentsList.push(Student);
			});
			setStudentsList(StudentsList);
			setLoadingStudents(false);
		}
	}, [Students, courses.length, dispatch]);

	const handleAddingItems = () => {
		const newItems = [...items];
		const coursesList = [...courses];
		const index = newItems.findIndex((a) => a.id === item);
		if (index > -1) {
			newItems[index] = {
				id: newItems[index].id,
				name: newItems[index].name,
				quantity: newItems[index].quantity + 1,
			};
			setItems(newItems);
		} else {
			const newItem = {
				id: item,
				name: coursesList.filter((a) => a.key === item)[0].text,
				quantity: 1,
			};
			newItems.push(newItem);
		}
		setItems(newItems);
	};

	const handleRemoveItems = (id) => {
		let updatedItems = [...items];
		updatedItems = updatedItems.filter((a) => a.id !== id);
		setItems(updatedItems);
	};

	const handleAddNewRegistration = async (values) => {
		const newItems = [...items];
		const itemsForRegistration = newItems.map((item) => {
			return  { id: item.id } ;
		});

		const newRegistration = {
			estudiante: {
				id: values.estudiante,
			},
			cursos: itemsForRegistration,
			estado: true,
		};

		try {
			console.log(newRegistration);
			const registration = await RegistrationService.createRegistration(newRegistration);
			toast.info('Matricula creada exitosamente');
			history.push(`matriculas/${registration.id}`);
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<FinalForm
			onSubmit={(values) => handleAddNewRegistration(values)}
			validate={validate}
			render={({
				handleSubmit,
				submitting,
				submitError,
				invalid,
				pristine,
				dirtySinceLastSubmit,
			}) => (
				<Form
					onSubmit={handleSubmit}
					error
					loading={loading || loadingStudents}>
					<Header
						as='h2'
						content='Agregar nueva matricula'
						color='pink'
						textAlign='center'
					/>
					
					<Field
						name='estudiante'
						component={SelectedInput}
						placeholder='Selecione estudiante'
						options={StudentsList}
						width='3'
					/>
					<Grid columns='2'>
						<Grid.Row columns='2'>
							<Grid.Column width='5'>
								<Field
									name='curso'
									component={SelectedInput}
									placeholder='Seleccione un curso'
									options={courses}
									width='3'
									handleOnChange={(e) => setItem(e)}
								/>
							</Grid.Column>
							<Grid.Column>
								<Popup
									inverted
									content='Agregar a matriculación'
									trigger={
										<Button
											type='button'
											loading={submitting}
											color='violet'
											icon='plus circle'
											onClick={handleAddingItems}
											disabled={!item}
										/>
									}
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							{items && items.length > 0 && (
								<Table celled collapsing style={{ marginLeft: '2%' }}>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>Curso</Table.HeaderCell>
											<Table.HeaderCell>Cantidad</Table.HeaderCell>
											<Table.HeaderCell />
										</Table.Row>
									</Table.Header>
									<Table.Body>
										{items.map((item) => (
											<Table.Row key={item.id}>
												<Table.Cell>{item.name}</Table.Cell>
												<Table.Cell textAlign='center'>
													{item.quantity}
												</Table.Cell>
												<Table.Cell>
													<Popup
														inverted
														content='Matriculación eliminada.'
														trigger={
															<Button
																color='red'
																icon='remove circle'
																type='button'
																onClick={() => handleRemoveItems(item.id)}
															/>
														}
													/>
												</Table.Cell>
											</Table.Row>
										))}
									</Table.Body>
								</Table>
							)}
						</Grid.Row>
					</Grid>
					<br />
					{submitError && !dirtySinceLastSubmit && (
						<ErrorMessage error={submitError} text='Valores invalidos' />
					)}
					<Button
						fluid
						disabled={
							(invalid && !dirtySinceLastSubmit) ||
							pristine ||
							items.length === 0
						}
						loading={submitting}
						color='violet'
						content='Agregar nueva matricula'
					/>
				</Form>
			)}
		/>
	);
};

export default RegistrationForm;
