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
          <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
            <Link className="navbar-brand" to="/"><img src={icon} alt=""/></Link>
            <div className="navbar-start">
              <Link className="navbar-item" to="/dog-list">My Dogs</Link>
              <Link className="navbar-item" to="/edit-dog/:id">Edit Dog</Link>
              <Link className="navbar-item" to="/create-dog">Create Dog</Link>
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
