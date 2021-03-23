import React from 'react';
import { Link } from 'react-router-dom';
import {
	Breadcrumb,
	Container,
	Divider,
	Grid,
	Header,
	Icon,
	Segment,
} from 'semantic-ui-react';
import RegistrationForm from 'components/registration/RegistrationForm';

const Registration = () => {
	return (
		<Segment>
			<Breadcrumb size='small'>
				<Breadcrumb.Section>Matriculación</Breadcrumb.Section>
				<Breadcrumb.Divider icon='right chevron' />
				<Breadcrumb.Section as={Link} to='/matriculas'>
					Lista de matriculación
				</Breadcrumb.Section>
				<Breadcrumb.Divider icon='right chevron' />
				<Breadcrumb.Section active>Nueva Matriculación</Breadcrumb.Section>
			</Breadcrumb>
			<Divider horizontal>
				<Header as='h4'>
					<Icon name='address card outline' />
				</Header>
			</Divider>
			<Container>
				<Grid columns='3'>
					<Grid.Column width='3' />
					<Grid.Column width='10'>
						<RegistrationForm />
					</Grid.Column>
					<Grid.Column width='3' />
				</Grid>
			</Container>
		</Segment>
	);
};

export default Registration;
