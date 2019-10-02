import React, { Component } from 'react';
import PropTypes from 'prop-types';
import icon from '../../images/gshd.png';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';


class Nav extends Component {
  
  onLogoutClick = e => {
    e.preventDefault();

    // Brought in from authActions
    this.props.logoutUser();
  };

  render() {
    
    // To display when user is logged out
    const loggedOutButtons = (
      <div className="navbar-item">
        <div className="buttons">
          <Link to="/register" className="button is-primary">
            <strong>Sign up</strong>
          </Link>
          <Link to="/login" className="button is-light">Log in</Link>
        </div>
      </div>
    );

    // To display when user is logged in
    const profileButton = (
      <div className="navbar-item">
        <div className="buttons">
          <Link to="/profile" className="button is-white">Profile</Link>
          <button className="button is-white" onClick={this.onLogoutClick}>Logout</button>
        </div>
      </div>
    )

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src={icon} alt=""/>
          </Link>
          <a href="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/gshds">GSHDs</Link>
            <Link className="navbar-item" to="/create-gshd">Create GSHD</Link>
          </div>
          <div className="navbar-end">
            {this.props.isAuthenticated ? profileButton : loggedOutButtons}
          </div>
        </div>
      </nav>
    )
  }
}

Nav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps, 
{logoutUser})(withRouter(Nav));