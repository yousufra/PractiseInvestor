import {fetchHoldings, updateHolding} from '../constants/actionTypes';

const reducer = (holdings=[], action) => { //need to inialize state(holdings) , holdings is gunna be an array of objects, reducer returns the new state
  switch (action.type) {
    case fetchHoldings:
      return action.payload;
    case updateHolding:
      return action.payload;
    default:
      return holdings;
  }
}

export default reducer;