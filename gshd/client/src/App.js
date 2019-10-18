import './styles/app.scss';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store.js';
import { setCurrentUser, logoutUser } from './actions/authActions';

// Components
import Nav from './components/Nav/Nav.js';
import Home from './components/Home/Home.js';
import Footer from './components/Footer/Footer.js';

// Auth
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken.js';
import Register from '../src/components/authentication/Register/Register.js';
import Login from '../src/components/authentication/Login/Login.js';
import Profile from './components/Profile/Profile.js';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.js';

// GSHD Components
import Create from './components/GSHDs/Create/Create.js';
import List from './components/GSHDs/List/List.js';
import Edit from './components/GSHDs/Edit/Edit.js';

// Check to see if user already has Auth token
if (localStorage.jwtToken) {

  // Set auth token header
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and isAuthenticated in global state
  store.dispatch(setCurrentUser(decoded));

  // Check that token hasn't expired
  const currentTime = Date.now() / 1000; 
  
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    
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

          <Route path="/" exact component={Home}/>
          <Route path="/gshds" component={List}/>
          <Route path="/create-gshd" component={Create}/>
          <Route path="/edit-gshd/:id" component={Edit}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>

          <Switch>
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>

          <Footer/>

        </Router>
      </Provider>
    );
  }
}

export default App;
