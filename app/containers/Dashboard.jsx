import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Books from '../components/Books';
import Trades from '../components/Trades';
import { addSelectedBook, findTrade } from '../actions/books';

const Dashboard = ({ user, addSelectedBook, findTrade }) => {
  return (
    <div className="text-center">
      <p>This is a super rough cut of the dashboard</p>
      { user.requestedBy.length > 0 &&
        <div className="row">
          <h3>You have the following books that have been requested:</h3>
          <Books books={user.requestedBy} handleClick={addSelectedBook} findTrade={findTrade} requestedBy />
        </div>
      }
      { user.requestedFrom.length > 0 &&
        <div className="row">
          <h3>You have requested the following books:</h3>
          <Books books={user.requestedFrom} handleClick={addSelectedBook} />
        </div>
      }
      { user.trades.length > 0 &&
        <div className="row">
          <h3>You have completed the following trades</h3>
          <Trades trades={user.trades} />
        </div>
      }


    </div>
  );
};

// Data that needs to be called before rendering the component on the server side.
// TODO: Dashboard.need??

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  addSelectedBook: PropTypes.func.isRequired,
  findTrade: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { addSelectedBook, findTrade })(Dashboard);
