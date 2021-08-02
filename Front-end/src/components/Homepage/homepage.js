/* eslint-disable */
import React, {useState} from 'react';
import NavBar from '../NavBar/navBar';
import Dashboard from '../Dashboard/dashboard';
import Order from '../Order/order';
import PastActivities from '../PastActivities/PastActivities';
import Ranking from '../Ranking/Ranking';

const Homepage = () => {

  const [component, setComponent] = useState('Dashboard');

  //Dashboard, Order, Past Acitivities, Ranking
  const toggleComponent = (componentString) => {
    setComponent(componentString);
  }

  return (
    <>
      <NavBar toggleComponent={toggleComponent}/>
      {component==='Dashboard' && <Dashboard />}
      {component==='Order' && <Order />}
      {component==='Past Activities' && <PastActivities />}
      {component==='Ranking' && <Ranking />}
    </>
  );
};

export default Homepage;
