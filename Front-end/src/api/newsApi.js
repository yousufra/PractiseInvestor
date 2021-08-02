/* eslint-disable */
import axios from 'axios';

// should store in env file
const baseURL = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=';
const apiKey = '8e5f59c1da7c435c990ff33bbef6da6b';

// get a current price of a stock
export const topNews = () => {
  return axios.get(baseURL + `${apiKey}`);
};
