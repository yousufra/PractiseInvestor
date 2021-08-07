const axios = require('axios');
const User = require('../models/userModel');
require('dotenv').config();

async function getPrices() {
  const users = await User.find();
  const prices = {};
  for (const user of users) {
    for (const holding of user.holdings) {
      prices[holding.ticker] = 0;
    }
  }
  for (const [key] of Object.entries(prices)) {
    await axios.get(`https://api.twelvedata.com/price?symbol=${key}&apikey=${process.env.API_KEY}`)
      .then((res) => {
        prices[key] = Number(res.data.price);
      });
  }
  return [prices, users];
}

exports.getRanking = async (req, response) => {
  const [prices, users] = await getPrices();
  try {
    const rankings = [];
    for (let j = 0; j < users.length; j += 1) {
      const {
        userName, holdings, activities, cash,
      } = users[j];
      const totalNumberOfActivities = activities.length;
      const numberOfStocks = holdings.length;
      let calcPortfolioValue = cash;
      for (let i = 0; i < holdings.length; i += 1) {
        calcPortfolioValue += prices[holdings[i].ticker] * holdings[i].quantity;
      }
      rankings.push({
        userName,
        totalValue: calcPortfolioValue,
        totalNumberOfActivities,
        numberOfStocks,
      });
    }
    rankings.sort((a, b) => b.totalValue - a.totalValue); // Sort by totalValue
    response.status(200);
    response.send(rankings);
  } catch (error) {
    response.status(500);
    response.send(error);
  }
};
