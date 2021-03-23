import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

const NotFound = () => {
	return (
		<Segment placeholder>
			<Header icon>
				<Icon name='search' />
				Oops - Página no encontrada.
			</Header>
			<Segment.Inline>
				<Button as={Link} to='/cursos' primary content='Ir a cursos' />
			</Segment.Inline>
		</Segment>
	);
};

export default NotFound;
