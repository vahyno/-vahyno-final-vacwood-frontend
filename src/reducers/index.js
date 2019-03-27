import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';

import classrooms from './classroom';

export default combineReducers({
    classrooms,
    loadingBar: loadingBarReducer,
});