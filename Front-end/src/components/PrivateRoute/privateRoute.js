/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.authenticate);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    const tokenObject = JSON.parse(localStorage.getItem('home'))

    if (tokenObject) {
      const token = tokenObject.token;
      const tokenExpiration = jwtDecode(token).exp;
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