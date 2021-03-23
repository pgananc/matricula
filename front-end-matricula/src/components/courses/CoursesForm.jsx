// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Form, Header, Button } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { useDispatch, useSelector } from 'react-redux';

import {
	fetchCourse,
	addCourse,
	updateCourse,
} from '../../app/store/actions/course.actions';

import TextInput from '../ui/TextInput';
import ErrorMessage from '../ui/ErrorMessage';

const validate = combineValidators({
	nombre: isRequired({ message: 'Nombre requerido' }),
	siglas: isRequired({ message: 'Siglas requerido' }),
});

const CoursesForm = ({ id }) => {
	const { course, loading } = useSelector((state) => state.course);
	const dispatch = useDispatch();

	const [actionLabel, setActionLabel] = useState('Agregar curso');

	useEffect(() => {
		if (id) {
			dispatch(fetchCourse(id));
			setActionLabel('Editar curso');
		} else setActionLabel('Agregar curso');
	}, [id, dispatch]);

	const handleCreateorEdit = (values) => {
		if (id) {
			dispatch(updateCourse(values));
			// Update Dish
		} else {
			const newCourse = {
				nombre: values.nombre,
				siglas: values.siglas,
				estado: true,
			};
			// Create dish
			dispatch(addCourse(newCourse));
		}
	};

	return (
		<FinalForm
			onSubmit={(values) => handleCreateorEdit(values)}
			initialValues={id && course}
			validate={validate}
			render={({
				handleSubmit,
				submitting,
				submitError,
				invalid,
				pristine,
				dirtySinceLastSubmit,
			}) => (
				<Form onSubmit={handleSubmit} error loading={loading}>
					<Header
						as='h2'
						content={actionLabel}
						color='pink'
						textAlign='center'
					/>
					<Field
						name='nombre'
						component={TextInput}
						placeholder='Nombre'
					/>
					<Field
						name='siglas'
						component={TextInput}
						placeholder='Siglas'
					/>
					{submitError && !dirtySinceLastSubmit && (
						<ErrorMessage error={submitError} text='Valores invalidos' />
					)}
					<Button
						fluid
						disabled={(invalid && !dirtySinceLastSubmit) || pristine}
						loading={submitting}
						color='violet'
						content={actionLabel}
					/>
				</Form>
			)}
		/>
	);
};

export default CoursesForm;
