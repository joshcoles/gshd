import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logoutUser } from '../../actions/authActions';

class Profile extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    
    return (
      <div>
        <section className="section">
          <h1>{user.name}'s Profile</h1>
          <div className="container columns">
            <strong>You are logged in.</strong>
            <button onClick={this.onLogoutClick}>Logout</button>
          </div>
        </section>
      </div>
    );
  }
}

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Profile));