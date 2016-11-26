import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';
import Navbar, { Header, Brand, Toggle, Collapse } from 'react-bootstrap/lib/Navbar';// syntax for production
import { LinkContainer } from 'react-router-bootstrap';
import { logOut } from '../actions/users';

const Navigation = ({ user, logOut }) => {
    return (
      <Navbar fluid>
        <Header>
          <Brand>
            <Link to="/">React</Link>
          </Brand>
          <Toggle />
        </Header>
        <Collapse>
          <Nav key="left">
            <LinkContainer to="/about">
              <NavItem>About</NavItem>
            </LinkContainer>
            <LinkContainer to="/books">
              <NavItem>Books</NavItem>
            </LinkContainer>
          </Nav>
          { user.authenticated ?
            <Nav pullRight key="right">
              <LinkContainer to="/add_book">
                <NavItem>Add Book</NavItem>
              </LinkContainer>
              <LinkContainer active={false} onClick={logOut} to="/">
                <NavItem>Logout</NavItem>
              </LinkContainer>
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
