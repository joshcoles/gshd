import { GET_GSHDS, NEW_GSHD } from './types.js';
import axios from 'axios';

export const getGSHDS = () => dispatch => {
  
  axios.get('http://localhost:4000/api/gshds/')
    .then(response => {

      dispatch({
        type: GET_GSHDS,
        payload: response.data
      });

    })
    .catch(error => console.log(error));
 
}

// export const newGSHD = () => dispatch => {
  
//   // Send new GSHD to server then redirect to list of all GSHDs
//   axios.post('http://localhost:4000/api/gshds/add', newGshd)
//     .then(res => {
//       dispatch()
//     })
//     .then(() => this.props.history.push('/gshds'));

// }