import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import user from './user';
import message from './message';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  message,
  routing,
  form: formReducer
});

export default rootReducer;
