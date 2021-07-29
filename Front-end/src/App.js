import './App.css';
import NavBar from './components/NavBar/navBar';
import Dashboard from './components/Dashboard/dashboard';
import Order from './components/Order/order';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Container} from '@material-ui/core';
import Login from './components/Login/login';

function App() {

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Switch>
          <Route path="/login" exact component={Login}/>
          <Route path="/" exact>
            <NavBar></NavBar>
            <Dashboard></Dashboard>
            <Order></Order>
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;


