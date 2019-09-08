import React, { Component } from 'react';
import './styles/app.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import GSHDList from './components/GSHDList/GSHDList.js';
import LandingPage from './components/LandingPage/LandingPage.js';
import EditGSHD from './components/EditGSHD/EditGSHD.js';
import CreateGSHD from './components/CreateGSHD/CreateGSHD.js';
import Nav from './components/Nav/Nav.js';

class App extends Component {

  render() {

    return (
      <Router>
        <div id="gshd" className="App">
          <Nav/>
        </div>

        <Route path="/" exact component={LandingPage}/>
        <Route path="/gshds" component={GSHDList}/>
        <Route path="/create-gshd" component={CreateGSHD}/>
        <Route path="/edit-gshd/:id" component={EditGSHD}/>
      </Router>
    );
  }
}

export default App;
