import axios from 'axios';

const baseURL = 'http://localhost:4000/users'; //use .env file

export const getUser = async (username) => {
  return axios.get(baseURL + `/${username}`);

};