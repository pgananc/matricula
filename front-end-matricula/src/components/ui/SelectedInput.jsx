import React from 'react';
import { Form, Select, Label } from 'semantic-ui-react';

const SelectedInput = ({
	input,
	width,
	options,
	handleOnChange,
	placeholder,
	meta: { touched, error },
}) => {
	return (
		<Form.Field error={touched && !!error} width={width}>
			<Select
				value={input.value}
				onChange={(e, data) => {
					input.onChange(data.value);
					if (handleOnChange) handleOnChange(data.value);
				}}
				placeholder={placeholder}
				options={options}
			/>
			{touched && error && (
				<Label pointing basic color='red'>
					{error}
				</Label>
			)}
		</Form.Field>
	);
};

export default SelectedInput;
