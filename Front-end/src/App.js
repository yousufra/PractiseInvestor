/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Homepage from './components/Homepage/homepage';
import Authenticate from './components/Authenticate/authenticate';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Switch>
          <Route path="/auth" exact component={Authenticate} />
          <PrivateRoute path="/" exact component={Homepage} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
