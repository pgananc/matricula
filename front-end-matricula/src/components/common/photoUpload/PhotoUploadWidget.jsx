import React, { useEffect, useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import PhotoWidgetDropZone from './PhotoWidgetDropZone';

const PhotoUploadWidget = ({ loading, uploadPhoto }) => {
	const [files, setFiles] = useState([]);
	const [image, setImage] = useState(null);

	useEffect(() => {
		return () => {
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		};
	});

	return (
		<Grid textAlign='center'>
			<Grid.Row />
			<Grid.Column width={4}>
				<Header color='teal' sub content='Step 1 - Add Photo' />
				<PhotoWidgetDropZone setFiles={setFiles} />
			</Grid.Column>
			<Grid.Column width={1} />
			<Grid.Column width={4}>
				<Header sub color='teal' content='Step 2 - Resize image' />
				{files.length > 0 && (
					<PhotoWidgetCropper
						setImage={setImage}
						imagePreview={files[0].preview}
					/>
				)}
			</Grid.Column>
			<Grid.Column width={1} />
			<Grid.Column width={3}>
				<Header sub color='teal' content='Step 3 - Preview & Upload' />
				{files.length > 0 && (
					<>
						<div
							className='img-preview'
							style={{ minHeight: '200px', overflow: 'hidden' }}
						/>
						<Button.Group widths='2'>
							<Button
								positive
								icon='cloud upload'
								loading={loading}
								onClick={() => uploadPhoto(image)}
							/>
							<Button
								icon='close'
								disabled={loading}
								onClick={() => setFiles([])}
							/>
						</Button.Group>
					</>
				)}
			</Grid.Column>
		</Grid>
	);
};

export default PhotoUploadWidget;
