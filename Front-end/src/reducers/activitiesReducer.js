import { FETCH_ACTIVITIES } from '../constants/actionTypes';

const activitiesReducer = (activities = [], action) => {
  switch (action.type) {
    case FETCH_ACTIVITIES:
      return action.payload;
    default:
      return activities;
  }
};

export default activitiesReducer;
