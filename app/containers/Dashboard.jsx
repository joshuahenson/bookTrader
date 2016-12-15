import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import {  } from '../actions/books';

// TODO: only show requested text if requested
const Dashboard = ({ user }) => {
  return (
    <div>
      <p>This is a super rough cut of the dashboard</p>
      <p>You have the following books that have been requested:</p>
      {user.requestedBy.map(book => book.book)}
      <p>You have requested the following books:</p>
      {user.requestedFrom.map(book => book.book)}
    </div>
  );
};

// Data that needs to be called before rendering the component on the server side.
// TODO: Dashboard.need??

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Dashboard);
