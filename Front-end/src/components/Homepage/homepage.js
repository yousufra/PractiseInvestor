/* eslint-disable */
import React, {useState} from 'react';
import NavBar from '../NavBar/navBar';
import Dashboard from '../Dashboard/dashboard';
import Order from '../Order/order';
import PastActivities from '../PastActivities/PastActivities';
import UsersRankings from '../UsersRanking/UsersRanking';
import News from '../News/News'

const Homepage = () => {

  const [component, setComponent] = useState('Dashboard');
  const [title, setTitle] = useState('Practise Investing');

  //Dashboard, Order, Past Acitivities, Ranking
  const toggleComponent = (componentString) => {
    setComponent(componentString);
    setTitle(componentString);
  }

  return (
    <>
      <NavBar toggleComponent={toggleComponent} title={title}/>
      {component==='Dashboard' && <Dashboard />}
      {component==='Order' && <Order toggleComponent={toggleComponent}/>}
      {component==='Past Activities' && <PastActivities />}
      {component==='Ranking' && <UsersRankings />}
      {component==='News' && <News />}
    </>
  );
};

export default Homepage;
