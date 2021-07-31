import {FETCH_HOLDINGS, UPDATE_HOLDING} from '../constants/actionTypes';
import {getUser, putHoldings} from '../api/backendApi';//import all exports from api folder (EX, api.(function) to use a function )

//Action Creators - functions that return an action

export const getAllHoldings = () => async (dispatch) => { //need async (dispatch) middleware because we need some time to get all the holdings
  try {
    const {data} = await getUser(); //decontruct response to grab data from response object

    const holdings = data.holdings;
    const action = {
      type: FETCH_HOLDINGS,
      payload: holdings
     }

     dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
}

export const updateHoldings = (order) => async (dispatch) => {
  try {
    const {data} = await putHoldings(order)
    const holdings = data.holdings;

    dispatch({type: UPDATE_HOLDING, payload: holdings});
  } catch (error) {
    console.log(error.message);
  }

}