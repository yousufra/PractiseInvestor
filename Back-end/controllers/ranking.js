const User = require('../models/userModel');
const Stock = require('../models/stockModel');
const axios = require('axios');
require('dotenv').config();

const getStockTicker = async (company) => {
    var regex = new RegExp([company].join(""), "i");
    const stockObject = (await Stock.find({ name: { $regex: regex}}))[0];
    const stockTicker = stockObject.symbol;
    return stockTicker;
}

exports.getRanking = async (req, response) => {
  try {
    const users = await User.find();
    const stocks = await Stock.find();

    let rankings = [];

    for (let j=0; j<users.length; j++){
      const { userName, holdings, activities, cash } = users[j];
      const totalNumberOfActivities = activities.length;
      const numberOfStocks = holdings.length;
      const apiKey = process.env.API_KEY;

      let calcPortfolioValue = cash;
      async function calcValue () {

        for (let i=0; i<holdings.length; i++){

          const ticker = await getStockTicker(holdings[i].company);

          const url = 'https://api.twelvedata.com'+ `/price?symbol=${ticker}&apikey=${apiKey}`;
          await axios.get(url)
            .then(res => {
              const price = Number(res.data.price);
              const holdingValue = price * holdings[i].quantity;
              calcPortfolioValue+=holdingValue;
              if(i===holdings.length-1 ) {
                rankings.push({userName, totalValue: calcPortfolioValue, totalNumberOfActivities, numberOfStocks});
                if(j===users.length-1) {
                  rankings.sort((a,b) => b.totalValue - a.totalValue);
                  response.status(200);
                  response.send(rankings);
                }
              }
            });
          };
      }
      await calcValue();
    };
    return;
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};