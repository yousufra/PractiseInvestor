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


//Container: centers your content horizontally
//App Bar: provides content and actions related to the current screen. It’s used for branding, screen titles, navigation, and actions.







// import './App.css';
// import { useEffect, useState } from 'react';
// import {getUser} from './services/backendApi';

// function App() {

//   const [user, setUser] = useState({});

//   useEffect( () => {
//     getUser('RahmatYousufi').then(newUser => {
//       setUser(newUser.data);
//     });
//   }, []);

//   return (
//     <div className="App">
//       hello world, {user.cash}
//     </div>
//   );
// }

// export default App;