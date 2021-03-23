import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	Breadcrumb,
	Container,
	Divider,
	Grid,
	Header,
	Icon,
	Label,
	Segment,
	Table,
} from 'semantic-ui-react';
import StudentService from 'app/api/studentService';
import CourseService from 'app/api/courseService';
import RegistrationService from 'app/api/registrationService';
import LoadingComponent from 'components/common/LoadingComponent';

const RegistrationDetails = ({ match }) => {
	const [registration, setRegistration] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchRegistration = useCallback(async () => {
		setLoading(true);
		try {
			const registration = await RegistrationService.fetchRegistration(match.params.id);
			if (registration) {
				const estudiante = await StudentService.fetchStudent(
					registration.estudiante.id
				);

				const cursos = [];
				if (registration.cursos.length > 0) {
					registration.cursos.forEach((curso) => {
					
						CourseService.fetchCourse(curso.id)
							.then((response) => {
								if (response) {
									const courseItem = {
										nombre: response.nombre,
										siglas: response.siglas,
										id: response.id,
										estado:response.estado	,
									};
									cursos.push(courseItem);
								}

							

								const registrationDetail = {
									id: registration.id,									
									estudiante,
									cursos,
									fechaMatricula: new Date(registration.fechaMatricula).toLocaleDateString(),
									
								};
								setRegistration(registrationDetail);
							})
							.catch((error) => toast.error(error));
					});
				}
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	}, [match.params.id]);

	useEffect(() => {
		fetchRegistration();
	}, [fetchRegistration]);

	if (loading) return <LoadingComponent content='Cargando detalle de matricula...' />;

	let registrationDetailedArea = <h4>Detalles de matricula</h4>;

	if (registration) {
		registrationDetailedArea = (
			<Segment.Group>
				<Segment>
					<Header as='h4' block color='violet'>
						Estudiante
					</Header>
				</Segment>
				<Segment.Group>
					<Segment>
						<p>
							<strong>Nombre: </strong>
							{`${registration.estudiante.nombres} ${registration.estudiante.apellidos}`}
						</p>
						<p>
							<strong>Edad: </strong>
							{`${registration.estudiante.edad}`}
						</p>
					</Segment>
				</Segment.Group>
				<Segment>
					<Header as='h4' block color='violet'>
						Matricula
					</Header>
				</Segment>
				<Segment.Group>
					<Segment>
						<p>
							<strong>Codigo Matricula: </strong>
							{registration.id}
						</p>
					
						<p>
							<strong>Fecha creacion: </strong>
							{registration.fechaMatricula}
						</p>
					</Segment>
				</Segment.Group>
				<Segment>
					<Table celled striped color='violet'>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell colSpan='4'>
									<Icon name='course' />
									Curso
								</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Nombre</Table.HeaderCell>
								<Table.HeaderCell>Sigla</Table.HeaderCell>
								
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{registration.cursos.length > 0 &&
								registration.cursos.map((item) => (
									<Table.Row key={item.id}>
										<Table.Cell>{item.nombre}</Table.Cell>
										<Table.Cell>{item.siglas}</Table.Cell>
									</Table.Row>
								))}
						</Table.Body>
					</Table>
					
				</Segment>
			</Segment.Group>
		);
	}

	return (
		<Segment>
			<Breadcrumb size='small'>
				<Breadcrumb.Section>Registration</Breadcrumb.Section>
				<Breadcrumb.Divider icon='right chevron' />
				<Breadcrumb.Section as={Link} to='/matriculas'>
					Lista de matriculas
				</Breadcrumb.Section>
				<Breadcrumb.Divider icon='right chevron' />
				<Breadcrumb.Section active>Detalle de matricula</Breadcrumb.Section>
			</Breadcrumb>
			<Divider horizontal>
				<Header as='h4'>
					<Icon name='address card outline' />
					Detalle de matricula
				</Header>
			</Divider>
			<Container>
				<Grid columns='3'>
					<Grid.Column width='3' />
					<Grid.Column width='10'>{registrationDetailedArea}</Grid.Column>
					<Grid.Column width='3' />
				</Grid>
			</Container>
		</Segment>
	);
};

export default RegistrationDetails;
