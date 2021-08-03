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




exports.getRanking = async (req, res) => {
  try {
    const users = await User.find();
    const stocks = await Stock.find();

    //array {rank, username, totalValue, totalNumberOfActivities, numberOfStocks}
    let rankings = [];

    users.forEach((user) => {
      const { userName, holdings, activities, cash } = user;
      const totalNumberOfActivities = activities.length;
      const numberOfStocks = holdings.length;

      //totalValue
      const apiKey = process.env.API_KEY;

      let calcPortfolioValue = cash;
      console.log('hello1');
      function calcValue () {

        holdings.forEach(async (holding) =>{

          const ticker = await getStockTicker(holding.company);

          // const requestPrice = async (ticker, apiKey) => {

          const url = 'https://api.twelvedata.com'+ `/price?symbol=${ticker}&apikey=${apiKey}`;
          axios.get(url)
            .then(res => {
              const price = Number(res.data.price);//current price for that specific holding
                  const holdingValue = price * holding.quantity;
                  calcPortfolioValue+=holdingValue;
                  console.log('hello2');
            });
          });
      }
      calcValue();
      let i=0;
      while (i<10000000){
        i++;
      }
      console.log('hello3');
      // console.log(calcPortfolioValue, 1);

      rankings.push({userName, totalValue: calcPortfolioValue, totalNumberOfActivities, numberOfStocks})
    });

    //filter ranking so index matches the ranking for easy rendering on front end, here adding the ranking number too

    res.status(200);
    res.send(rankings);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};