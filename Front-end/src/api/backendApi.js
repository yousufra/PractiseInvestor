import axios from 'axios';
require('dotenv').config();

const baseURL = 'http://localhost:4000'; //use .env file
// const baseURL = process.env.SERVER_API_URL;

const API = axios.create({baseURL});

API.interceptors.request.use((req) => { //attach token to all headers in all requests 

  if (localStorage.getItem('home')) {
    req.headers['x-auth-token'] = `${JSON.parse(localStorage.getItem('home')).token}`;
  }

  return req;
})

//need the token in the req.header********
export const getUser = () => API.get('/user');

//need the token in the req.header*********
export const putHoldings = (newOrder) => API.put('/user/updateHolding', newOrder);

export const signIn = (form) => API.post('/user/login', form);
export const signUp = (form) => API.post('/users', form);



