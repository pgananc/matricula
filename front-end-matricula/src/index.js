import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';

import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import configureStore from './app/store/configureStore';
import ScrollToTop from './components/common/ScrollToTop';

console.info(`The app is running on ${process.env.NODE_ENV}`);
console.info(
	`Custom Environment Variable - The app is running on ${process.env.REACT_APP_ENV}`
);

const rootEL = document.getElementById('root');

const store = configureStore();

const history = createBrowserHistory();

const app = (
	<Provider store={store}>
		<Router history={history}>
			<ScrollToTop>
				<App />
			</ScrollToTop>
		</Router>
	</Provider>
);

ReactDOM.render(app, rootEL);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default history;
