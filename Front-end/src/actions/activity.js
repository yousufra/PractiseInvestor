import { FETCH_ACTIVITIES } from '../constants/actionTypes';
import { getUser } from '../api/backendApi';

export const getAllActivities = () => async (dispatch) => {
  try {
    const { data } = await getUser();

    const { activities } = data;
    const action = {
      type: FETCH_ACTIVITIES,
      payload: activities,
    };

    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};