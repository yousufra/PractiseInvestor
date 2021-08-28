import { combineReducers } from 'redux';

import holdingsReducer from './holdingsReducer';
import authReducer from './authenticateReducer';
import activitiesReducer from './activitiesReducer'

export default combineReducers({
  holdings: holdingsReducer,
  authenticate: authReducer,
  activities: activitiesReducer,
});
