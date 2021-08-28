import axios from 'axios';

const baseURL = 'http://localhost:4000';

const API = axios.create({ baseURL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('home')) {
    req.headers['x-auth-token'] = `${JSON.parse(localStorage.getItem('home')).token}`;
  }

  return req;
});

export const getUser = () => API.get('/user');

export const putHoldings = (newOrder) => API.put('/user/updateHolding', newOrder);

export const signIn = (form) => API.post('/user/login', form);
export const signUp = (form) => API.post('/users', form);

export const getMatchingStocks = (filter) => API.get(`/stocks/${filter}`);

export const getAllStocks = () => API.get('/stocks');

export const getAllUsers = () => API.get('/users');

export const getRanking = () => API.get('/users/ranking');
