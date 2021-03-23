import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingComponent = ({ inverted = false, content }) => (
	<Dimmer active inverted={inverted}>
		<Loader content={content} />
	</Dimmer>
);

export default LoadingComponent;
