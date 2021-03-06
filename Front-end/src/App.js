import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Homepage from './components/Homepage/homepage';
import Authenticate from './components/Authenticate/authenticate';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Box>
        <Switch>
          <Route path="/auth" exact component={Authenticate} />
          <PrivateRoute path="/" exact component={Homepage} />
        </Switch>
      </Box>
    </BrowserRouter>
  );
}

export default App;
