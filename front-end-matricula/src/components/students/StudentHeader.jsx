import React from 'react';
import { Segment, Grid, Item, Header, Icon } from 'semantic-ui-react';

const StudentHeader = ({ student }) => {
	return (
		<Segment>
			<Grid>
				<Grid.Column width={12}>
					<Item.Group>
						<Item>
							<Item.Image
								avatar
								size='small'
								src={student.urlFoto || '/assets/user.png'}
							/>
							<Item.Content verticalAlign='middle'>
								<Header as='h1'>
									{student.nombres} {student.apellidos}
								</Header>
								<br />
								<Icon name='calendar alternate outline' />
								<Header as='h3'>{student.dni}</Header>
							</Item.Content>
						</Item>
					</Item.Group>
				</Grid.Column>
			</Grid>
		</Segment>
	);
};

export default StudentHeader;
