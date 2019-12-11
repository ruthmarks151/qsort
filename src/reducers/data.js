import {FETCH_SORTS} from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_SORTS:
      return action.payload;
    default:
      return state;
  }
};
