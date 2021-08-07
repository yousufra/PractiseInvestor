import { useState, useEffect } from 'react';
import './Homepage.css';
import PacmanLoader from "react-spinners/PacmanLoader";
import NavBar from '../NavBar/NavBar';
import { Dashboard } from '../Dashboard/Dashboard';
import Order from '../Order/Order';
import PastActivities from '../PastActivities/PastActivities';
import UsersRankings from '../UsersRanking/UsersRanking';
import News from '../News/News';

export const Homepage = () => {

  const [loading, setLoading] = useState(false);
  const [component, setComponent] = useState('Dashboard');
  const [title, setTitle] = useState('Practise Investing');  
   //Dashboard, Order, Past Acitivities, Ranking
   const toggleComponent = (componentString: string): void => {
    setComponent(componentString);
    setTitle(componentString);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {
        loading 
        ? <div className='Homepage'><PacmanLoader color={'blue'} loading={loading} size={45} /></div>
        : <>
          <NavBar toggleComponent={toggleComponent} title={title} />
          {component === 'Dashboard' && <Dashboard />}
          {component === 'Order' && <Order toggleComponent={toggleComponent} />}
          {component === 'Past Activities' && <PastActivities />}
          {component === 'Ranking' && <UsersRankings />}
          {component === 'News' && <News />}
        </>
      }
    </>
  );
};
