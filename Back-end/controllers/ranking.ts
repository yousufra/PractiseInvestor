import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import Ranking from '../models/rankingModel';
import User from '../models/userModel';
import { totalValueHistory } from './users';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import RankingI from '../interfaces/Ranking';
dotenv.config();

async function getPrices() {
  const users = await User.find();
  const prices: any = {};
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

async function storeRanking() {
  const [prices, users] = await getPrices();
  const rankings = [];
  const date = new Date();
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

export async function getRanking(req: Request, res: Response) {
  try {
    let rankings = await Ranking.find();
    if (!rankings.length) { // Will create rankings if none have ever been created. Only happens once.
      rankings = await storeRanking();
    }
    rankings.sort((a: RankingI, b: RankingI) => b.totalValue - a.totalValue);
    res.send(rankings);
    res.status(200);
  } catch(error) {
    console.log(`Could not get ranking: ${error}`);
    res.status(500);
  }
}
