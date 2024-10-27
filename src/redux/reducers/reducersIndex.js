import {combineReducers} from 'redux';
import AuthReducer from '../reducers/authReducer';
import BlogReducer from '../reducers/blogReducer';

const reducers = combineReducers({
  auth: AuthReducer,
  blog: BlogReducer,
});


export default reducers;
