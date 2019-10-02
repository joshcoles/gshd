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

    case NEW_GSHD:
      return {
        ...state,
        gshd: action.payload
      }

    default:
      return state;
  }
}