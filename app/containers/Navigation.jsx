import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Nav, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap';
import Navbar, { Header, Brand, Toggle, Collapse } from 'react-bootstrap/lib/Navbar';// syntax for production
import { LinkContainer } from 'react-router-bootstrap';
import { logOut } from '../actions/users';

// FUTURE: add user pic next to name
const Navigation = ({ user, logOut }) => {
  return (
    <Navbar fluid>
      <Header>
        <Brand>
          <Link to="/">Book Trader</Link>
        </Brand>
        <Toggle />
      </Header>
      <Collapse>
        <Nav key="left">
          <LinkContainer to="/about">
            <NavItem>About</NavItem>
          </LinkContainer>
          { user.authenticated ?
            <NavDropdown title="Books" id="books-dropdown">
              <LinkContainer to="/books">
                <MenuItem>All Books</MenuItem>
              </LinkContainer>
              <LinkContainer to={`/books/${user.userId}`}>
                <MenuItem>My Books</MenuItem>
              </LinkContainer>
              <LinkContainer to="/add_book">
                <MenuItem>Add Book</MenuItem>
              </LinkContainer>
            </NavDropdown>
            :
            <LinkContainer to="/books">
              <NavItem>Books</NavItem>
            </LinkContainer>
          }
        </Nav>
        { user.authenticated ?
          <Nav pullRight key="right">
            <LinkContainer to="/dashboard">
              <NavItem>Dashboard</NavItem>
            </LinkContainer>
            <NavDropdown
              noCaret
              title={<span className="glyphicon glyphicon-cog" />}
              id="session-nav-dropdown"
            >
              <MenuItem header>{user.userName}</MenuItem>
              <MenuItem divider />
              <LinkContainer active={false} to="/profile">
                <MenuItem>My Profile</MenuItem>
              </LinkContainer>
              <MenuItem divider />
              <LinkContainer active={false} to="/">
                <Button bsStyle="danger" onClick={logOut} block>Log Out</Button>
              </LinkContainer>
            </NavDropdown>

          </Nav>
        :
          <Nav pullRight key="right">
            <LinkContainer to="/login">
              <NavItem>Login</NavItem>
            </LinkContainer>
          </Nav>
        }
      </Collapse>
    </Navbar>
  );
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut }, null, { pure: false })(Navigation);
