import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errors: {}
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

    console.log(userData);
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
                    <input 
                      onChange={this.onChangeField} 
                      value={this.state.email}
                      error={errors.email}
                      id="email"
                      type="email"
                      />

                    <label className="label" htmlFor="password">Password</label>
                    <input 
                      onChange={this.onChangeField} 
                      value={this.state.password}
                      error={errors.password}
                      id="password"
                      type="password"
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

export default Login;