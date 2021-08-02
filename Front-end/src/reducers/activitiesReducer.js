import { FETCH_ACTIVITIES } from '../constants/actionTypes';

// eslint-disable-next-line max-len
const activitiesReducer = (activities = [], action) => { // need to inialize state(holdings) , holdings is gunna be an array of objects, reducer returns the new state
  switch (action.type) {
    case FETCH_ACTIVITIES:
      return action.payload;
    default:
      return activities;
  }
};

export default activitiesReducer;
