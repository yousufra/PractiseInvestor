/* eslint-disable no-console */
const axios = require('axios');
const rateLimit = require('axios-rate-limit');
const Ranking = require('../models/rankingModel');
const User = require('../models/userModel');
const LastUpdate = require('../models/lastUpdateModel');
const { totalValueHistory } = require('./users');
require('dotenv').config();

async function getPrices() {
  const users = await User.find();
  const prices = {};
  for (const user of users) {
    for (const holding of user.holdings) {
      prices[holding.ticker] = 0;
    }
  }
  const http = rateLimit(axios.create(), { maxRequests: 55, perMilliseconds: 60000 });
  for (const [key] of Object.entries(prices)) {
    await http.get(`https://api.twelvedata.com/price?symbol=${key}&apikey=${process.env.API_KEY}`)
      .then((res) => {
        prices[key] = Number(res.data.price);
      });
  }
  return [prices, users];
}

async function setLastUpdate(date) {
  LastUpdate.updateOne({}, { date }, (err, success) => {
    if (err) console.log('err', err);
    else console.log('success', success);
  });
}

async function storeRanking(date) {
  const [prices, users] = await getPrices();
  const rankings = [];
  for (let j = 0; j < users.length; j += 1) {
    const {
      userName, holdings, activities, cash, _id,
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
    totalValueHistory(_id, calcPortfolioValue, date);
  }
  await Ranking.deleteMany();
  Ranking.create(rankings);
  return rankings;
}

async function checkLastUpdate() {
  const lastUpdate = await LastUpdate.findOne();
  const date = new Date();
  if (lastUpdate.date) {
    const lastDayOfMonth = lastUpdate.date.getDate();
    const todayDayOfWeek = date.getDay();
    const todayDayOfMonth = date.getDate(); // only triggers Mon-Fri if last update before today
    if (todayDayOfWeek > 0 && todayDayOfWeek < 6 && todayDayOfMonth !== lastDayOfMonth) {
      storeRanking(date);
      setLastUpdate(date);
    }
  } else {
    storeRanking(date);
    setLastUpdate(date);
  }
}

async function getRanking(req, res) {
  let rankings = await Ranking.find();
  if (!rankings.length) { // Will create rankings if none have ever been created. Only happens once.
    rankings = await storeRanking();
  }
  rankings.sort((a, b) => b.totalValue - a.totalValue);
  res.send(rankings);
  res.status(200);
}

module.exports = {
  getRanking,
  checkLastUpdate,
};
