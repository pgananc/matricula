import React from 'react';
import { Form, Popup, Segment } from 'semantic-ui-react';

const FilterHeader = ({
	students,
	onChange,
	applyFilter,
	searchParams,
	resetFilter,
}) => {
	return (
		<Segment>
			<Form>
				<Form.Group>
					<Form.Select
						inline
						label='Estudiantes'
						placeholder='Estudiantes'
						name='idEstudiante'
						options={students}
						onChange={onChange}
						value={searchParams?.idEstudiante && searchParams.idEstudiante}
					/>
					<Popup
						inverted
						content='Apply Filters'
						trigger={
							<Form.Button
								color='pink'
								icon='search'
								onClick={applyFilter}
								type='button'
							/>
						}
					/>
					<Popup
						inverted
						content='Clean Filters'
						trigger={
							<Form.Button color='purple' icon='undo' onClick={resetFilter} />
						}
					/>
				</Form.Group>
			</Form>
		</Segment>
	);
};

export default FilterHeader;
