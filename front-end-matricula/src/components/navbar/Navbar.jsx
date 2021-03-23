// @ts-nocheck
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Dropdown, Icon, Image, Menu } from 'semantic-ui-react';
import { logout } from 'app/store/actions/auth.actions';
import { isAllowed } from 'app/config/auth/credentials';

const Navbar = () => {
	const { currentUser, menus } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	return (
		<Menu fixed='top' inverted>
			<Container>
				<Menu.Item header as={Link} to='/'>
					<Icon name='student' /> Matrícula
				</Menu.Item>
				<Menu.Item>
					<Dropdown pointing='top left' text='Resources'>
						<Dropdown.Menu>
							{isAllowed(menus, 'Estudiante') && (
								<Dropdown.Item
									text='Estudiantes'
									icon='address card'
									as={Link}
									to='/estudiantes'
								/>
							)}
							{isAllowed(menus, 'Curso') && (
								<Dropdown.Item
									text='Cursos'
									icon='list ul'
									as={Link}
									to='/cursos'
								/>
							)}
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Item>
				<Menu.Item>
					<Dropdown pointing='top left' text='Matricula'>
						<Dropdown.Menu>
							{isAllowed(menus, 'Matricula') && (
								<Dropdown.Item
									text='Nueva Matricula'
									icon='file alternate'
									as={Link}
									to='/nuevaMatricula'
								/>
							)}
							{isAllowed(menus, 'Matriculas') && (
								<Dropdown.Item
									text='Lista de Matriculas'
									icon='clipboard list'
									as={Link}
									to='/matriculas'
								/>
							)}
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Item>
				<Menu.Item position='right'>
					<Image avatar spaced='right' src='/assets/user.png' />
					<Dropdown pointing='top left' text={currentUser.sub}>
						<Dropdown.Menu>
							<Dropdown.Item
								text='Logout'
								icon='log out'
								onClick={() => {
									dispatch(logout());
								}}
							/>
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Item>
			</Container>
		</Menu>
	);
};

export default Navbar;
