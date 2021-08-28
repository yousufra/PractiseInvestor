import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Holdings from './Holdings/holdings';
import { getAllHoldings } from '../../actions/holdings';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllHoldings());
  }, [dispatch]);

  return (
    <>
      <Holdings />
    </>
  );
};

export default Dashboard;
