import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

// Register User
export const registerUser = (userData, history) => {
  return (dispatch) => {
    axios
    .post('http://localhost:4000/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }); 
  }
}

// Login User
export const loginUser = userData => {
  return (dispatch) => {

    axios
      .post('http://localhost:4000/api/users/login', userData)
      .then(res => {
  
        localStorage.setItem('jwtToken', res.data.token);
  
        setAuthToken(res.data.token);
  
        /*
          Token comes in as a giant hash, which when decoded turns into something like this:          
          {
            id: "5d93562a0323523bb8b8aef", 
            name: "Test Username", 
            iat: 1570134943, 
            exp: 1601693369
          }        
        */

        dispatch({
          type: SET_CURRENT_USER,
          payload: jwt_decode(res.data.token)
        });
      });
  }
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => {
  return (dispatch) => {

    // Remove token from local storage
    localStorage.removeItem("jwtToken");
  
    // Remove auth header for future requests
    setAuthToken(false);
  
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    });
  };
}