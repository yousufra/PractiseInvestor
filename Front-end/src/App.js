import './App.css';
import { useEffect} from 'react';
import NavBar from './components/NavBar/navBar';
import Dashboard from './components/Dashboard/dashboard';
import {useDispatch} from 'react-redux';
import {getAllHoldings} from './actions/holdings';
import Order from './components/Order/order';

function App() {

  const dispatch = useDispatch();//allows us to dispatch an action

  useEffect(() => {
    dispatch(getAllHoldings());
  }, [dispatch]);

  return (
    <div>
      <NavBar></NavBar>
      <Dashboard></Dashboard>
      <Order></Order>
    </div>
  );
}

export default App;


