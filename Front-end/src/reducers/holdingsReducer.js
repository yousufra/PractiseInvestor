import { FETCH_HOLDINGS, UPDATE_HOLDING } from '../constants/actionTypes';

const holdingsReducer = (holdings = { holdings: [], cash: 0 }, action) => {
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
