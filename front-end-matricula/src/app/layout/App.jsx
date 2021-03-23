// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import LoadingComponent from 'components/common/LoadingComponent';
import ModalContainer from 'components/common/ModalContainer';
import { getJwt } from 'app/config/auth/credentials';
import Routes from 'app/config/Routes';
import { fetchMenu, getUser } from '../store/actions/auth.actions';

const App = () => {
	const [appLoaded, setAppLoaded] = useState(false);

	const { authenticated } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		const token = getJwt();
		if (token) {
			dispatch(getUser());
			dispatch(fetchMenu());
		}
		setAppLoaded(true);
	}, [dispatch]);

	if (!appLoaded) return <LoadingComponent content='Loading App..' />;

	return (
		<>
			<ToastContainer position='bottom-right' />
			<ModalContainer />
			<Routes authenticated={authenticated} />
		</>
	);
};

export default App;
