import { EReduxActionTypes, IReduxBaseAction } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action:IReduxBaseAction) => {
  switch (action.type) {
    case EReduxActionTypes.AUTHENTICATE:
      localStorage.setItem('home', JSON.stringify({ ...action?.payload })); // action?.data - does not throw an error when action doesnt have a data property
      return { ...state, authData: action?.payload };
    case EReduxActionTypes.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducer;
