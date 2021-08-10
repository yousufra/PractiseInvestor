/* eslint-disable */
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const baseURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=';
//const apiKey = 'P3ALPJ1AEVHPEXFF';



export const getDataForCompanyWithSymbol = (ticker) => {
  return axios.get(baseURL + `${ticker}&apikey={apiKey}`);
};

console.log(getDataForCompanyWithSymbol('GOOG'));
