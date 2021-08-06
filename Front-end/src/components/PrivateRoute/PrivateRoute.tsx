/* eslint-disable */
import { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { JwtTokenI } from '../../interfaces/JwtToken';

const PrivateRoute = ({ component: Component, ...rest }) => {

  const auth = useSelector((state: any) => state.authenticate);
  console.log('private route auth 1', auth)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  console.log('is authenticated', isAuthenticated);
  useEffect(() => {
    const tokenObject: any = localStorage.getItem('home');
    console.log('token obj private route', tokenObject)
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
    console.log('private route auth 2', auth)

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