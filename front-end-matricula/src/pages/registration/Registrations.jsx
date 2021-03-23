import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import RegistrationService from 'app/api/registrationService';
import LoadingComponent from 'components/common/LoadingComponent';
import FilterHeader from 'components/registration/FilterHeader';
import useFetchStudents from 'app/hooks/useFetchStudents';
import StudentService from 'app/api/studentService';

const Registrations = () => {
	const [registrations, setRegistrations] = useState([]);
	const [loading, setLoading] = useState(false);
	const [StudentsList, setStudentsList] = useState([]);
	const [Students] = useFetchStudents();
	const [searchParams, setSearchParams] = useState({
		idEstudiante: null,
	});

	const history = useHistory();

	const fetchRegistrations = useCallback(async () => {
		setLoading(true);
		const registrationsNew = [];
		let estudiante;
		let registrationDetail;
		setRegistrations(null);
		try {
			const registrations = await RegistrationService.fetchRegistrations();
			if (registrations) {
				registrations.forEach((registration)=> {
			
					if(registration.estudiante !== undefined ){
					StudentService.fetchStudent(
						registration.estudiante.id
					).then(response=>{
						if(response){
							 estudiante={
								nombres:response.nombres,
								apellidos: response.apellidos,
								edad: response.edad,
								id: response.id,
							}	
							 registrationDetail = {
								id: registration.id,									
								estudiante,
								cursos: registration.cursos,
								fechaMatricula: registration.fechaMatricula,
								
							};	
														
						}
						
						registrationsNew.push(registrationDetail);		
						setRegistrations(registrationsNew);
					}).catch((error) => toast.error(error));
				}
			});
				
			}
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
		}
	}, []);
	const handleDeleteRegistration = async (id) => {
		setLoading(true);
		try {
			let registrations = [...StudentsList];
			await RegistrationService.deleteRegistration(id);
			registrations = registrations.filter((a) => a.id !== id);
			setRegistrations(registrations);
			toast.info('Estudiante eliminado.');
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRegistrations();
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
		}
	}, [Students, fetchRegistrations]);

	const handleOnChange = (e, { value, name }) => {
		console.log('component', { value, name });
		const params = { ...searchParams };
		params[name] = value;
		setSearchParams(params);
	};

	const handleApplyFilters = async () => {
		setLoading(true);
		const registrationsNew = [];
		let estudiante;
		let registrationDetail;
		setRegistrations(null);
		try {			
			const registrations = await RegistrationService.fetchRegistrationsByFilters(
				searchParams
			);			
			registrations.forEach((registration)=> {
			
				if(registration.estudiante !== undefined ){
				StudentService.fetchStudent(
					registration.estudiante.id
				).then(response=>{
					if(response){
						 estudiante={
							nombres:response.nombres,
							apellidos: response.apellidos,
							edad: response.edad,
							id: response.id,
						}	
						 registrationDetail = {
							id: registration.id,									
							estudiante,
							cursos: registration.cursos,
							fechaMatricula: registration.fechaMatricula,
							
						};	
						
						
					}
					
					registrationsNew.push(registrationDetail);		
					setRegistrations(registrationsNew);
				}).catch((error) => toast.error(error));
			}
		});
					
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleResetFilters = async () => {
		const params = {
			idEstudiante: null,
		};
		setSearchParams(params);
		fetchRegistrations();
	};

	let registrationsList = <h4>No existe datos</h4>;
	
	if (registrations && registrations.length > 0) {
				
		registrationsList = (
			<Table>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell width='5'>Nombres</Table.HeaderCell>
						<Table.HeaderCell width='2'>Fecha Registro</Table.HeaderCell>
						<Table.HeaderCell width='3' />
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{registrations.map((registration) => (
						<Table.Row key={registration.id}>
							<Table.Cell>{`${registration.estudiante.nombres} ${registration.estudiante.apellidos}`}</Table.Cell>
							<Table.Cell>
								{new Date(registration.fechaMatricula).toLocaleDateString()}
							</Table.Cell>
							<Table.Cell>
								<Popup
									inverted
									content='Matricula detalles'
									trigger={
										<Button
											color='violet'
											icon='address card outline'
											onClick={() => history.push(`/matriculas/${registration.id}`)}
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
											loading={loading}
											onClick={() => handleDeleteRegistration(registration.id)}
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

	if (loading) return <LoadingComponent content='Cargando matriculas...' />;

	return (
		<Segment>
			<Breadcrumb size='small'>
				<Breadcrumb.Section>Matricula</Breadcrumb.Section>
				<Breadcrumb.Divider icon='right chevron' />
				<Breadcrumb.Section active>Lista de matricula</Breadcrumb.Section>
			</Breadcrumb>
			<Divider horizontal>
				<Header as='h4'>
					<Icon name='list alternate outline' />
					Matriculas
				</Header>
			</Divider>
			<Container>
				<FilterHeader
					students={StudentsList}
					onChange={handleOnChange}
					applyFilter={handleApplyFilters}
					searchParams={searchParams}
					resetFilter={handleResetFilters}
				/>
				<Grid columns='3'>
					<Grid.Column width='3' />
					<Grid.Column width='10'>{registrationsList}</Grid.Column>
					<Grid.Column width='3' />
				</Grid>
			</Container>
		</Segment>
	);
};

export default Registrations;
