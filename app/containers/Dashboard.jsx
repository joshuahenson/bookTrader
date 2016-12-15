import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Books from '../components/Books';
import { addSelectedBook } from '../actions/books';

const Dashboard = ({ user, addSelectedBook }) => {
  return (
    <div>
      <p>This is a super rough cut of the dashboard</p>
      { user.requestedBy.length > 0 &&
        <div>
          <p>You have the following books that have been requested:</p>
          <Books books={user.requestedBy} handleClick={addSelectedBook} requestedBy />
        </div>
      }
      { user.requestedFrom.length > 0 &&
        <div>
          <p>You have requested the following books:</p>
          <Books books={user.requestedFrom} handleClick={addSelectedBook} />
        </div>
      }


    </div>
  );
};

// Data that needs to be called before rendering the component on the server side.
// TODO: Dashboard.need??

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  addSelectedBook: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { addSelectedBook })(Dashboard);
