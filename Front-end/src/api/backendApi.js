import axios from 'axios';

const baseURL = 'http://localhost:4000/users'; //use .env file

export const getUser = (username) => axios.get(baseURL + `/${username}`);


export const putHoldings = (username, newOrder) => axios.put(baseURL + `/${username}`, newOrder);