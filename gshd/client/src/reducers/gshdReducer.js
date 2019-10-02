import { GET_GSHDS, NEW_GSHD } from '../actions/types.js';

const initialState = {
  gshds: [],
  gshd: {}
}

export default function (state = initialState, action) {
  switch(action.type) {
    case GET_GSHDS:

      return {
        ...state,
        gshds: action.payload
      }

    default:
      return state;
  }
}