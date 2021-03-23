import React, { useEffect, useState } from 'react';
import { combineValidators, isRequired } from 'revalidate';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, Form, Header } from 'semantic-ui-react';
import TextInput from 'components/ui/TextInput';
import ErrorMessage from 'components/ui/ErrorMessage';
import useFetchStudent from 'app/hooks/useFetchStudent';

const validate = combineValidators({
	nombres: isRequired({ message: 'Nombre requerido' }),
	apellidos: isRequired({ message: 'Apellido requerido' }),
	dni: isRequired({ message: 'Dni requerido' }),
	edad: isRequired({ message: 'Edad requerido' }),
});

const StudentForm = ({ studentId, submitHandler }) => {
	const [actionLabel, setActionLabel] = useState('Agregar Estudiante');

	const [Student, loading] = useFetchStudent(studentId);

	useEffect(() => {
		if (studentId) {
			setActionLabel('Editar Estudiante');
		} else setActionLabel('Agregar Estudiante');
	}, [studentId]);

	return (
		<FinalForm
			validate={validate}
			onSubmit={(values) => submitHandler(values)}
			initialValues={studentId && Student}
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
						name='nombres'
						component={TextInput}
						placeholder='Nombre'
					/>
					<Field
						name='apellidos'
						component={TextInput}
						placeholder='Apellidos'
					/>
					<Field
						name='dni'
						component={TextInput}
						placeholder='Dni'
					/>
					<Field
						name='edad'
						component={TextInput}
						placeholder='Edad'
					/>
					{submitError && !dirtySinceLastSubmit && (
						<ErrorMessage error={submitError} text='Invalid Input' />
					)}
					<Button
						fluid
						disabled={(invalid && !dirtySinceLastSubmit) || pristine}
						loading={submitting}
						color='violet'
						content={actionLabel}
					/>
					{/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
				</Form>
			)}
		/>
	);
};

export default StudentForm;
