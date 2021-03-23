// @ts-nocheck

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { closeModal } from 'app/store/actions/modal.actions';
// import { connect } from 'react-redux';

// const mapState = (state) => ({
// 	body: state.modal.body,
// 	open: state.modal.open,
// 	size: state.modal.size,
// 	closeIcon: state.modal.closeIcon,
// });

// const actions = {
// 	closeModal,
// };

// const ModalContainer = ({ body, open, size, closeIcon }) => {
// 	return (
// 		<Modal open={open} onClose={closeModal} size={size} closeIcon={closeIcon}>
// 			<Modal.Content>{body}</Modal.Content>
// 		</Modal>
// 	);
// };

// export default connect(mapState, actions)(ModalContainer);

const ModalContainer = () => {
	const { body, open, size = 'mini', closeIcon } = useSelector(
		(state) => state.modal
	);

	const dispatch = useDispatch();

	return (
		<Modal
			open={open}
			onClose={() => dispatch(closeModal())}
			size={size}
			closeIcon={closeIcon}>
			<Modal.Content>{body}</Modal.Content>
		</Modal>
	);
};

export default ModalContainer;
