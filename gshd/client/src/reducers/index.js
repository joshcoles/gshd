import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import errorReducer from './errorReducer.js';
import gshdReducer from './gshdReducer.js';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  gshds: gshdReducer
});