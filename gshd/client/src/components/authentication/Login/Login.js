import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../../actions/authActions';
import classnames from 'classnames';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  componentDidMount() {
    // If user navigates to register page while logged in, 
    // redirect to /profile
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/profile');
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/profile');
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChangeField = e => {
    this.setState({ 
      [e.target.id]: e.target.value 
    });
  };
  
  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  render() {

    const errors = this.state.errors;

    return (
      <div>
      <section className="section">
        <h1>Login</h1>
        <div className="container columns">
          
          <form 
            noValidate
            onSubmit={this.onSubmit}
            className="column">
              <p>Don't have an account? <Link to="/register">Register</Link></p>
              <div className="container columns">
                <div className="column">
                  <div className="field">

                    <label className="label" htmlFor="email">Email</label>
                    <span className="red-text">
                      {errors.email}
                      {errors.emailnotfound}
                    </span>
                    <input 
                      onChange={this.onChangeField} 
                      value={this.state.email}
                      error={errors.email}
                      id="email"
                      type="email"
                      className={classnames('', {
                        invalid: errors.email || errors.emailnotfound
                      })}
                      />

                    <label className="label" htmlFor="password">Password</label>
                    <span className="red-text">
                      {errors.password}
                      {errors.passwordincorrect}
                    </span>
                    <input 
                      onChange={this.onChangeField} 
                      value={this.state.password}
                      error={errors.password}
                      id="password"
                      type="password"
                      className={classnames('', {
                        invalid: errors.password || errors.passwordincorrect
                      })}
                      />

                    <button type="submit">Login</button>
                  </div>
                </div>
              </div>
          </form>
        </div>
      </section>
    </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);