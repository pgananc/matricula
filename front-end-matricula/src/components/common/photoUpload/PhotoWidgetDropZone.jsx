// @ts-nocheck
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { Icon, Header } from 'semantic-ui-react';

// JSS
const dropZoneStyles = {
	border: 'dashed 3px #eee',
	borderColor: '#eee',
	borderRadius: '5px',
	paddingTop: '30px',
	textAlign: 'center',
	height: '200px',
};

const dropZoneActive = {
	borderColor: 'green',
};

const PhotoWidgetDropZone = ({ setFiles }) => {
	const onDrop = useCallback(
		(acceptedFiles) => {
			// Do something with the file
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
		[setFiles]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div
			{...getRootProps()}
			style={
				isDragActive
					? { ...dropZoneStyles, ...dropZoneActive }
					: { dropZoneStyles }
			}>
			<input {...getInputProps()} />
			<Icon name='upload' size='huge' />
			<Header content='Drop Image here' />
		</div>
	);
};

export default PhotoWidgetDropZone;
