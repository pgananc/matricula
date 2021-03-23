// @ts-nocheck
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react';
import { getJwt } from 'app/config/auth/credentials';
import { openModal } from 'app/store/actions/modal.actions';
import LoginForm from 'components/auth/LoginForm';

// const actions = {
// 	openModal,
// };

const HomePage = () => {
	const { currentUser } = useSelector((state) => state.auth);
	const token = getJwt();
	const dispatch = useDispatch();

	return (
		<Segment inverted textAlign='center' vertical className='masthead'>
			<Container text>
				<Header as='h1' inverted>
					<Icon name='student' /> Matrícula
				</Header>
				{currentUser && token ? (
					<>
						<Header
							as='h2'
							inverted
							content='Bienvenido a matriculación'></Header>
						<Button
							size='huge'
							content='Ir a cursos'
							inverted
							as={Link}
							to='/cursos'
						/>
					</>
				) : (
					<>
						<Header as='h2' inverted content='Bienvenido a matriculación' />
						<Button
							size='huge'
							inverted
							content='Login'
							onClick={() => dispatch(openModal(<LoginForm />))}
						/>
					</>
				)}
			</Container>
		</Segment>
	);
};

// export default connect(null, actions)(HomePage);
export default HomePage;
