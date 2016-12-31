import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Main from './components/Main';
import About from './components/About';
import Auth from './containers/Auth';
import AddBook from './containers/AddBook';
import BooksContainer from './containers/BooksContainer';
import BookDetail from './containers/BookDetail';
import Profile from './containers/Profile';
import Dashboard from './containers/Dashboard';
import TradeDetail from './containers/TradeDetail';

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
      <Route path="books" component={BooksContainer} />
      <Route path="books/:user" component={BooksContainer} />
      <Route path="book/:bookId" component={BookDetail} />
      <Route path="trade/:tradeId" component={TradeDetail} onEnter={requireAuth} />
      <Route path="add_book" component={AddBook} onEnter={requireAuth} />
      <Route path="profile" component={Profile} onEnter={requireAuth} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    </Route>
  );
};
