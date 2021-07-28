import axios from 'axios';

const baseURL = 'https://api.twelvedata.com';
const apiKey = 'a6419f0e48c14c67a02ebc4e94b4c478';


//get a current price of a stock
const getCurrentPrice = (ticker, apiKey) => {
  return axios.get(baseURL + `/price?symbol=${ticker}&apikey={apiKey}` );
}