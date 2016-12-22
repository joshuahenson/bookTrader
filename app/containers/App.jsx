import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';
import Navigation from './Navigation';
import Message from './Message';


/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
const App = ({ children, isWaiting }) => {
  return (
    <div>
      <Helmet
        title="Book Trader"
        titleTemplate="%s - Universal React Example"
      />
      <Navigation />
      <Message />
      <div className="overlay-container">
        {isWaiting && <Spinner />}
        {children}
      </div>

    </div>
  );
};

App.propTypes = {
  children: PropTypes.object,
  isWaiting: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    isWaiting: state.user.isWaiting
  };
}

export default connect(mapStateToProps)(App);
