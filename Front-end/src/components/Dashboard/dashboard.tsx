/* eslint-disable */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Holdings } from './Holdings/Holdings'
import { getAllHoldings } from '../../actions/holdings';

export const Dashboard = () => {
  
  const dispatch = useDispatch(); // allows us to dispatch an action
  console.log('dashboard');

  useEffect(() => {
    console.log('getting all holdings dashboard');
    
    dispatch(getAllHoldings());
  }, [dispatch]);

  return (
    <div>
      <Holdings />
    </div>
  )
}

