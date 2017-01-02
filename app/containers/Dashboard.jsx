import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Books from '../components/Books';
import Trades from '../components/Trades';
import { addSelectedBook, findTrade } from '../actions/books';
import { denyTradeRequest } from '../actions/users';

const Dashboard = ({ user, addSelectedBook, findTrade, denyTradeRequest }) => {
  return (
    <div className="text-center">
      { user.requestedBy.length > 0 &&
        <div className="row">
          <h3>You have the following books that have been requested:</h3>
          <Books books={user.requestedBy} handleClick={addSelectedBook} findTrade={findTrade} denyTradeRequest={denyTradeRequest} requestedBy />
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
  findTrade: PropTypes.func.isRequired,
  denyTradeRequest: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { addSelectedBook, findTrade, denyTradeRequest })(Dashboard);
