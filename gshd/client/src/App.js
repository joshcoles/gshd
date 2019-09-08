import React, { Component } from 'react';
import './styles/app.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import DogList from './components/DogList.js';
import LandingPage from './components/LandingPage.js';
import EditDog from './components/EditDog.js';
import CreateDog from './components/CreateDog.js'
import Nav from './components/Nav.js';

class App extends Component {

  render() {

    return (
      <Router>
        <div id="gshd" className="App">
          <Nav/>
        </div>

        <Route path="/" exact component={LandingPage}/>
        <Route path="/dog-list" component={DogList}/>
        <Route path="/create-dog" component={CreateDog}/>
        <Route path="/edit-dog/:id" component={EditDog}/>
      </Router>
    );
  }
}

export default App;
