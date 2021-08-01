const Stock = require('../models/stockModel');
const request = require('request');

exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200);
    res.send(stocks);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};
