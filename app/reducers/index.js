import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import user from './user';
import message from './message';
import books from './booksReducer';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  books,
  message,
  routing,
  form: formReducer
});

export default rootReducer;
