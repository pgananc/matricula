// @ts-nocheck
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Navbar from 'components/navbar/Navbar';
import Students from 'pages/students/Students';
import Courses from 'pages/courses/Courses';
import HomePage from 'pages/home/HomePage';
import Registration from 'pages/registration/Registration';
import RegistrationDetails from 'pages/registration/RegistrationDetails';
import Registrations from 'pages/registration/Registrations';
import NotFound from 'components/common/NotFound';
import { isAllowed } from './auth/credentials';
import { useSelector } from 'react-redux';


const Routes = ({ authenticated }) => {
	const { menus } = useSelector((state) => state.auth);

	return (
		<>
			<Route exact path='/' component={HomePage} />
			{authenticated && menus && menus.length > 0 && (
				<Route
					path='/(.+)'
					render={() => (
						<>
							<Navbar />
							<Container style={{ marginTop: '7em' }}>
								<Switch>
									<Route exact path='/' component={HomePage} />
									{isAllowed(menus, 'Estudiante') && (
										<Route path='/estudiantes' component={Students} />
									)}
									{isAllowed(menus, 'Curso') && (
										<Route path='/cursos' component={Courses} />
									)}
									{isAllowed(menus, 'Matricula') && (
										<Route path='/nuevaMatricula' component={Registration} />
									)}
									{isAllowed(menus, 'Matricula') && (
										<Route path='/matriculas/:id' component={RegistrationDetails} />
									)}
									{isAllowed(menus, 'Matriculas') && (
										<Route path='/matriculas' component={Registrations} />
									)}
									<Route component={NotFound} />
								</Switch>
							</Container>
						</>
					)}
				/>
			)}
		</>
	);
};

export default Routes;
