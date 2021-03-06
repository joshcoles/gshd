import { GET_GSHDS, NEW_GSHD, DELETE_GSHD } from './types.js';
import axios from 'axios';

export const getGSHDS = () => dispatch => {
  
  axios.get('http://localhost:4000/api/gshds/')
    .then(response => {

      // Returns array of all GSHDs to reducer,
      // flagging type of action
      dispatch({
        type: GET_GSHDS,
        payload: response.data
      });

    }).catch(error => console.log(error));
 
}

export const newGSHD = (newGshd, history) => dispatch => {
  
  // Send new GSHD to server then redirect to list of all GSHDs
  axios.post('http://localhost:4000/api/gshds/add', newGshd)
    .then(res => {
      
      dispatch({
        type: NEW_GSHD,
        payload: res.data.updatedGSHDs
      });

    })
    .then(() => history.push('/gshds'));

}

export const deleteGSHD = (e) => dispatch => {

  return new Promise((resolve, reject) => {
    const elementId = e.target.closest('.box').id;
  
      axios.delete(`http://localhost:4000/api/gshds/delete/${elementId}`)
        .then((res) => {

          dispatch({
            type: DELETE_GSHD,
            payload: elementId
          });

          resolve();
        });
  });
}