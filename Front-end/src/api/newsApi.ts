import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const newsApiKey = process.env.REACT_APP_NEWS_API_KEY;

export const topNews = () => {
  return axios.get(`${newsApiKey}`);
};
