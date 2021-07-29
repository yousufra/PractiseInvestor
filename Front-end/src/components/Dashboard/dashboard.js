import React from 'react'
import { useEffect} from 'react';
import Holdings from './Holdings/holdings';
import {useDispatch} from 'react-redux';
import {getAllHoldings} from '../../actions/holdings';

const Dashboard = () => {

  const dispatch = useDispatch();//allows us to dispatch an action

  useEffect(() => {
    dispatch(getAllHoldings());
  }, [dispatch]);

  return (
    <>
      <Holdings></Holdings>
    </>
  )
}

export default Dashboard
