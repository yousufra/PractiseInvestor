import { AUTHENTICATE } from '../constants/actionTypes';
import { signIn, signUp } from '../api/backendApi';

export const login = (form, history) => async (dispatch) => {
  try {
    const { data } = await signIn(form);

    dispatch({
      type: AUTHENTICATE,
      data,
    });

    history.push('/');// after login push user to homepage
  } catch (error) {
    console.log(error);
  }
};

export const register = (form, history) => async (dispatch) => {
  try {
    const { data } = await signUp(form);

    dispatch({
      type: AUTHENTICATE,
      data,
    });

    history.push('/');
  } catch (error) {
    console.log(error);
  }
};
