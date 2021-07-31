import {AUTHENTICATE, LOGOUT} from '../constants/actionTypes';

const authReducer = (state = {authData: null}, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      localStorage.setItem('home', JSON.stringify({...action?.data})); //action?.data - does not throw an error when action doesnt have a data property
      return {...state, authData: action?.data};
    case LOGOUT:
      localStorage.clear();
      return {...state, authData: null};

    default:
      return state;
  }
}

export default authReducer;


