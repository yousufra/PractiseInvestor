/* eslint-disable no-console */
const request = require('request');
const Stock = require('../models/stockModel');

const url = 'https://api.twelvedata.com/stocks';

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

exports.getMatchingStocks = async (req, res) => {
  try {
    const { filter } = req.params;
    const regex = new RegExp([filter].join(''), 'i');
    const filteredStocks = await Stock.find({ name: { $regex: regex } });
    const firstFiveStocks = filteredStocks.slice(0, 5);
    res.status(200).send(firstFiveStocks);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

const getStocks = () => {
  request({ url, json: true }, (error, response) => {
    const { data } = response.body;
    const filteredData = data.filter((stock) => stock.exchange === 'NASDAQ' && stock.type === 'Common Stock');
    const deleteProperties = filteredData.map((stock) => (
      { symbol: stock.symbol, name: stock.name }));
    try {
      Stock.insertMany(deleteProperties);
    } catch (err) {
      console.log('hello error');
    }
  });
};

getStocks();
