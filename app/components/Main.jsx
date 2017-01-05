import React from 'react';
import { Link } from 'react-router';

const Main = () => {
  return (
    <div className="book-bg">
      <img src="https://source.unsplash.com/IOzk8YKDhYg/1500x1500" role="presentation" />
      <div className="well">
        <div className="page-header text-center">
          <h1>Book Trader <small>Demo App</small></h1>
        </div>
        <div className="row">
          <div className="col-sm-offset-2 col-sm-8">
            <h4>
              A place for sharing books.
            </h4>
            <ul className="list-unstyled">
              <li>List your books online</li>
              <li>Browse other user&apos;s books</li>
              <li>Make a trade</li>
            </ul>
            <Link to="/add_book">Get Started Now</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Main;
