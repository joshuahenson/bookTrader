import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Main from './components/Main';
import About from './components/About';
import Auth from './containers/Auth';
import Books from './containers/Books';
import AddBook from './containers/AddBook';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated } } = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated } } = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="login" component={Auth} onEnter={redirectAuth} />
      <Route path="about" component={About} />
      <Route path="books" component={Books} />
      <Route path="add_book" component={AddBook} onEnter={requireAuth} />
    </Route>
  );
};
