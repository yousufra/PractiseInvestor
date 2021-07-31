# PractiseInvestor

# Populate name and ticker api
```js
const url = 'https://api.twelvedata.com/stocks';

exports.getAllStocks = () => {
  console.log('hello');
  request({ url, json: true }, (error, response) => {
    const { data } = response.body;
    const filteredData = data.filter((stock) => stock.exchange === 'NASDAQ');
    console.log('hello');
    // eslint-disable-next-line max-len
    const deleteProperties = filteredData.map((stock) => ({ symbol: stock.symbol, name: stock.name }));
    console.log(deleteProperties);
    try {
      Stock.insertMany(deleteProperties);
      console.log('hello1');
    } catch (err) {
      console.log(err);
    }
  });
};
```