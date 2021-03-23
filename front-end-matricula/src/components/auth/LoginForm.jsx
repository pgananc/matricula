import React from 'react';
import { combineValidators, isRequired } from 'revalidate';
import { Form as FinalForm, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { Button, Form, Header } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import TextInput from 'components/ui/TextInput';
import { useDispatch } from 'react-redux';
import { login } from 'app/store/actions/auth.actions';
import ErrorMessage from 'components/ui/ErrorMessage';

const validate = combineValidators({
	username: isRequired('username'),
	password: isRequired('password'),
});

const LoginForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleLogin = async (values) => {
		try {
			await dispatch(login(values));
			history.push('/estudiantes');
		} catch (error) {
			return { [FORM_ERROR]: error?.data?.mensaje };
		}
	};
	return (
		<FinalForm
			onSubmit={(values) => handleLogin(values)}
			validate={validate}
			render={({
				handleSubmit,
				submitting,
				submitError,
				invalid,
				pristine,
				dirtySinceLastSubmit,
				// form,
			}) => (
				<Form onSubmit={handleSubmit} error>
					<Header
						as='h2'
						content='Login'
						color='pink'
						textAlign='center'
					/>
					<Field
						name='username'
						component={TextInput}
						placeholder='Usuario'
					/>
					<Field
						name='password'
						component={TextInput}
						placeholder='Password'
						type='password'
					/>
					{submitError && !dirtySinceLastSubmit && (
						<ErrorMessage error={submitError} text={submitError} />
					)}
					<Button
						fluid
						disabled={(invalid && !dirtySinceLastSubmit) || pristine}
						loading={submitting}
						color='violet'
						content='Ingresar'
					/>
					{/* form come from object destructuring */}
					{/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
				</Form>
			)}
		/>
	);
};

export default LoginForm;
