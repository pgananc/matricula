import { combineReducers } from 'redux';
import modalReducer from './modal.reducer';
import authReducer from './auth.reducer';
import courseReducer from './course.reducer';

const rootReducer = combineReducers({
	modal: modalReducer,
	auth: authReducer,
	course: courseReducer,
});

export default rootReducer;
