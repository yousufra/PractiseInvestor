import axios from 'axios';
require('dotenv').config();

const baseURL = 'http://localhost:4000/users'; //use .env file
// const baseURL = process.env.SERVER_API_URL;

export const getUser = (username) => axios.get(baseURL + `/${username}`);


export const putHoldings = (username, newOrder) => axios.put(baseURL + `/${username}`, newOrder);