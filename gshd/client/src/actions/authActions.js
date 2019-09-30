import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
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

// Login User
export const loginUser = userData => dispatch => {
  axios
    .post('http://localhost:4000/api/users/register', userData)
    .then(res => {
      
      localStorage.setItem('jwtToken', res.data);
      setAuthToken(res.data);

      dispatch({
        type: SET_CURRENT_USER,
        payload: jwt_decode(res.data)
      });
    });
}

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {

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