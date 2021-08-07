/* eslint-disable */
import { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { JwtTokenI } from '../../interfaces/JwtToken';
import { combineReducers } from '../../reducers/index';

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(JSON.stringify(combineReducers));
  const auth = useSelector((state) => state.authenticate);
  console.log(JSON.stringify(auth));
  console.log(JSON.stringify(DefaultRootState));
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  console.log('private route');
  useEffect(() => {
    const tokenObject = JSON.parse(localStorage.getItem('home'))
    if (tokenObject) {
      const token = JSON.parse(tokenObject).token;
      const tokenExpiration = jwtDecode<JwtTokenI>(token).exp;
      const dateNow = new Date();

      if (tokenExpiration < dateNow.getTime() / 1000) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
    // eslint-disable-next-line

  }, [auth])

  if (isAuthenticated === null) {
    return <></>;
  }

  return (
    <Route
      {...rest}
      render={(props) => (!isAuthenticated ? (
        <Redirect to="/auth" />
      ) : (
        <Component {...props} />
      ))}
    />
  );
};

export default PrivateRoute;