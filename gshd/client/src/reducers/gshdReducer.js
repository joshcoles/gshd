import { GET_GSHDS, NEW_GSHD, DELETE_GSHD } from '../actions/types.js';

const initialState = {
  gshds: []
}

export default function (state = initialState, action) {
  switch(action.type) {
    case GET_GSHDS:

      // gshds goes from an empty array to a full array, 
      // thanks to payload from GET_GSHDS dispatch/action
      return {
        ...state,
        gshds: action.payload
      }

    case NEW_GSHD:

      // Adding a new GSHD returns a payload of the updated GSHD list,
      // which the state gets updated with
      return {
       ...state,
       gshds: action.payload 
      }

    case DELETE_GSHD:
      
      return {
        ...state
      }

    default:
      return state;
  }
}