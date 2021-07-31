const Stock= require('../models/stockModel.js');

// exports.getAllStocks = async (req, res) => {
//   try {
//     const stocks = await Stock.find();
//     res.status(200);
//     res.send(stocks);
//   } catch (error) {
//     res.status(500);
//     res.send(error);
//   }
// }


const request = require('request');

const url='https://api.twelvedata.com/stocks';

request({url, json:true}, (error, response) => {
  const {data} = response.body;
  const filteredData = data.filter(stock => stock.exchange === 'NASDAQ');

  const deleteProperties = filteredData.map(stock => {
    return {
      symbol: stock.symbol,
      name: stock.name
    }
  })

  Stock.insertMany(deleteProperties);

})