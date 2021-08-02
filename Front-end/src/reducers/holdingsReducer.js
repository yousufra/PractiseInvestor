import { FETCH_HOLDINGS, UPDATE_HOLDING } from '../constants/actionTypes';

// eslint-disable-next-line max-len
const holdingsReducer = (holdings = { holdings: [], cash: 0 }, action) => { // need to inialize state(holdings) , holdings is gunna be an array of objects, reducer returns the new state
  switch (action.type) {
    case FETCH_HOLDINGS:
      return action.payload;
    case UPDATE_HOLDING:
      return action.payload;
    default:
      return holdings;
  }
};

export default holdingsReducer;
