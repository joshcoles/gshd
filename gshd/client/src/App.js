import React, { Component } from 'react';
import './styles/app.scss';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import DogList from './components/DogList.js';
import LandingPage from './components/LandingPage.js';
import EditDog from './components/EditDog.js';
import CreateDog from './components/CreateDog.js'
import icon from './images/gshd.png';

class App extends Component {

  render() {

    return (
      <Router>
        <div id="gshd" className="App">
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
                <Link className="navbar-item" to="/dog-list">My Dogs</Link>
                <Link className="navbar-item" to="/create-dog">Create Dog</Link>
              </div>
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <a href="/" className="button is-primary">
                      <strong>Sign up</strong>
                    </a>
                    <a href="/" className="button is-light">
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <Route path="/" exact component={LandingPage}/>
          <Route path="/dog-list" component={DogList}/>
          <Route path="/create-dog" component={CreateDog}/>
          <Route path="/edit-dog/:id" component={EditDog}/>
        </div>
      </Router>
    );
  }
}

export default App;
