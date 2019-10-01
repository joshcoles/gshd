import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import icon from '../../images/gshd.png';
import { connect } from 'react-redux';

class Nav extends Component {
  
  render() {
    return (
      <React.Fragment>
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
              <div className="navbar-item">
                <div className="buttons">
                  <Link to="/register" className="button is-primary">
                    <strong>Sign up</strong>
                  </Link>
                  <Link to="/login" className="button is-light">Log in</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </React.Fragment>
    )
  }
}

export default Nav;