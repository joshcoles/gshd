import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { registerUser } from '../../../actions/authActions';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Register extends Component {
  constructor() {

    super();
    
    this.state = {
      name: '',
      email: '',
      password: '', 
      password2: '',
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password, 
      password2: this.state.password2,
    };
    
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history); 
  }

  render() {

    const errors = this.state.errors;

    return (
      <div>
        <section className="section">
          <h1>Register</h1>
          <div className="container columns">
            
            <form 
              noValidate
              onSubmit={this.onSubmit}
              className="column">
                <p>Already have an account? <Link to="/login">Login</Link></p>
                <div className="container columns">
                  <div className="column">
                    <div className="field">

                      <label className="label" htmlFor="name">Name</label>
                      <span className="red-text">{errors.name}</span>
                      <input 
                        onChange={this.onChangeField} 
                        value={this.state.name}
                        error={errors.name}
                        id="name"
                        type="text"
                        className={classnames('', {
                          invalid: errors.name
                        })}
                        />

                      <label className="label" htmlFor="email">Email</label>
                      <span className="red-text">{errors.email}</span>
                      <input 
                        onChange={this.onChangeField} 
                        value={this.state.email}
                        error={errors.email}
                        id="email"
                        type="email"
                        className={classnames('', {
                          invalid: errors.email
                        })}
                        />

                      <label className="label" htmlFor="password">Password</label>
                      <span className="red-text">{errors.password}</span>
                      <input 
                        onChange={this.onChangeField} 
                        value={this.state.password}
                        error={errors.password}
                        id="password"
                        type="password"
                        className={classnames('', {
                          invalid: errors.email
                        })}
                        />

                      <label className="label" htmlFor="password2">Confirm Password</label>
                      <span className="red-text">{errors.password2}</span>
                      <input 
                        onChange={this.onChangeField} 
                        value={this.state.password2}
                        error={errors.password2}
                        id="password2"
                        type="password2"
                        className={classnames('', {
                          invalid: errors.password2
                        })}
                        />

                      <button type="submit">Sign Up</button>
                    </div>
                  </div>
                </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));