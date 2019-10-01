import React, { Component } from 'react';
import './styles/app.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken.js';
import { setCurrentUser, logoutUser } from './actions/authActions';

// Components
import GSHDList from './components/GSHDList/GSHDList.js';
import LandingPage from './components/LandingPage/LandingPage.js';
import EditGSHD from './components/EditGSHD/EditGSHD.js';
import CreateGSHD from './components/CreateGSHD/CreateGSHD.js';
import Nav from './components/Nav/Nav.js';
import Register from '../src/components/authentication/Register/Register.js';
import Login from '../src/components/authentication/Login/Login.js';

import Profile from './components/Profile/Profile.js';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.js';

console.log(localStorage.jwtToken);

// Check to see if user already has Auth token
if (localStorage.jwtToken) {

  // // Set auth token header
  setAuthToken(localStorage.jwtToken);

  // // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);

  // // Set user and isAuthenticated in global state
  store.dispatch(setCurrentUser(decoded));

  // Check that token hasn't expired
  const currentTime = Date.now() / 1000; 
  
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser(this.props.history));
    
    window.location.href = './login';
  }
}


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div id="gshd" className="App">
            <Nav/>
          </div>

          <Route path="/" exact component={LandingPage}/>
          <Route path="/gshds" component={GSHDList}/>
          <Route path="/create-gshd" component={CreateGSHD}/>
          <Route path="/edit-gshd/:id" component={EditGSHD}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          {/* <Route path="/profile" component={Profile}/> */}

          {/* Private Routes */}
          <Switch>
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
          
        </Router>
      </Provider>
    );
  }
}

export default App;
