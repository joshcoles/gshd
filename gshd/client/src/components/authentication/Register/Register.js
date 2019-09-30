import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                      <input 
                        onChange={this.onChangeField} 
                        value={this.state.name}
                        error={errors.name}
                        id="name"
                        type="text"
                        />

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

                      <label className="label" htmlFor="password2">Confirm Password</label>
                      <input 
                        onChange={this.onChangeField} 
                        value={this.state.password2}
                        error={errors.password2}
                        id="password2"
                        type="password2"
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

export default Register;