import { combineReducers } from 'redux';

import holdingsReducer from './holdingsReducer.ts';
import authReducer from './authenticateReducer.ts';
import activitiesReducer from './activitiesReducer.ts';

export default combineReducers({
  // put all individual reducers here
  holdings: holdingsReducer,
  authenticate: authReducer,
  activities: activitiesReducer,
});
