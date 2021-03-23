// @ts-nocheck
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { deleteCourses, deleteCourse, fetchCourses } from 'app/store/actions/course.actions';
import { openModal } from 'app/store/actions/modal.actions';
import LoadingComponent from 'components/common/LoadingComponent';
import CoursesForm from 'components/courses/CoursesForm';

const Courses = () => {
	const { courses, loadingCourse, loadingCourses } = useSelector(
		(state) => state.course
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCourses());
	}, [dispatch]);

	let courseList = <h4>El curso no esta en la lista</h4>;

	if (courses && courses.length > 0) {
		courseList = (
			<Table>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell width='5'>Nombre</Table.HeaderCell>
						<Table.HeaderCell width='2'>Siglas</Table.HeaderCell>
						<Table.HeaderCell width='2' />
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{courses.map((course) => (
						<Table.Row key={course.id}>
							<Table.Cell>{course.nombre}</Table.Cell>
							<Table.Cell>{course.siglas}</Table.Cell>
							<Table.Cell>
								<Popup
									inverted
									content='Curso actualizado.'
									trigger={
										<Button
											basic
											color='violet'
											icon='edit'
											loading={loadingCourse}
											onClick={() => {
												dispatch(openModal(<CoursesForm id={course.id} />));
											}}
										/>
									}
								/>
								<Popup
									inverted
									content='Curso eliminado.'
									trigger={
										<Button
											basic
											color='red'
											icon='trash'
											loading={loadingCourse}
											onClick={() => {
												dispatch(deleteCourse(course.id));
											}}
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

	if (loadingCourses) return <LoadingComponent content='Loading Cursos...' />;

	return (
		<Segment>
			<Breadcrumb size='small'>
				<Breadcrumb.Section>Resources</Breadcrumb.Section>
				<Breadcrumb.Divider icon='right chevron' />
				<Breadcrumb.Section active>Cursos</Breadcrumb.Section>
			</Breadcrumb>
			<Divider horizontal>
				<Header as='h4'>
					<Icon name='list alternate outline' />
					Lista de cursos
				</Header>
			</Divider>
			<Segment>
				<Button
					size='large'
					content='Nuevo Curso'
					icon='add'
					color='purple'
					onClick={() => {
						dispatch(openModal(<CoursesForm />));
					}}
				/>
			</Segment>
			<Container>
				<Grid.Column columns='3'>
					<Grid.Column width='3' />
					<Grid.Column width='10'>{courseList}</Grid.Column>
					<Grid.Column width='3' />
				</Grid.Column>
			</Container>
		</Segment>
	);
};

export default Courses;
