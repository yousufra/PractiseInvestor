/* eslint-disable */
import { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { JwtTokenI } from '../../interfaces/JwtToken';

const PrivateRoute = ({ component: Component, ...rest }) => {
<<<<<<< HEAD:Front-end/src/components/PrivateRoute/PrivateRoute.js
  const auth = useSelector((state) => state.authenticate);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  console.log('private route');
  useEffect(() => {
    const tokenObject = JSON.parse(localStorage.getItem('home'))
=======

  const auth = useSelector((state: any) => state.authenticate);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    const tokenObject: any = localStorage.getItem('home');
>>>>>>> f820d47fc2e2e5a93f2fcf2a46762643f3fac17e:Front-end/src/components/PrivateRoute/PrivateRoute.tsx
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