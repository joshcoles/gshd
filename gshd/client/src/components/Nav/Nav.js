import './nav.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';

class Nav extends Component {

  constructor() {
    super();
    
    this.state = {
      hamburgerIsOpen: false
    }

    this.onHamburgerClick = this.onHamburgerClick.bind(this);
  }
  
  onLogoutClick = e => {
    e.preventDefault();

    // Brought in from authActions
    this.props.logoutUser();
  };

  onLinkClick = () => {
    this.setState({
      hamburgerIsOpen: false
    });
  }

  onHamburgerClick(e) {
    e.preventDefault();

    this.setState({
      hamburgerIsOpen: !this.state.hamburgerIsOpen
    });
    
  }

  render() {
    
    // To display when user is logged out
    const loggedOutButtons = (
      <React.Fragment>
        <div className="navbar-item">
          <Link to="/register" onClick={this.onLinkClick} className="button is-primary">
            <strong>Sign up</strong>
          </Link>
        </div>
        <div className="navbar-item">
          <Link to="/login" onClick={this.onLinkClick} className="button is-light">Log in</Link>
        </div>
      </React.Fragment>
    );

    // To display when user is logged in
    const profileButton = (
      <div className="navbar-item">
        <div className="buttons">
          <Link to="/profile" onClick={this.onLinkClick} className="button button-dark">Profile</Link>
          <button className="button button-yellow" onClick={this.onLogoutClick}>Logout</button>
        </div>
      </div>
    )

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" onClick={this.onLinkClick} to="/">GSHD</Link>

          <span
            onClick={this.onHamburgerClick} 
            role="button" 
            className={`navbar-burger burger ${this.state.hamburgerIsOpen ? 'is-active' : ''}`} 
            aria-label="menu" 
            aria-expanded="false" 
            data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
          </span>
        </div>
        <div className={`navbar-menu ${this.state.hamburgerIsOpen ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link className="navbar-item" onClick={this.onLinkClick} to="/gshds">GSHDs</Link>
            <Link className="navbar-item" onClick={this.onLinkClick} to="/create-gshd">Create GSHD</Link>
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