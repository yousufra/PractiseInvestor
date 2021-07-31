import {FETCH_HOLDINGS, UPDATE_HOLDING} from '../constants/actionTypes';

const holdingsReducer = (holdings=[], action) => { //need to inialize state(holdings) , holdings is gunna be an array of objects, reducer returns the new state
  switch (action.type) {
    case FETCH_HOLDINGS:
      return action.payload;
    case UPDATE_HOLDING:
      return action.payload;
    default:
      return holdings;
  }
}

export default holdingsReducer;