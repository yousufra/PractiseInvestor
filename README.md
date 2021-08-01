# PractiseInvestor

# Populate name and ticker api
```js
const url = 'https://api.twelvedata.com/stocks';

const getStocks = () => {
  request({ url, json: true }, (error, response) => {
    const { data } = response.body;
    const filteredData = data.filter((stock) => stock.exchange === 'NASDAQ' && stock.type === 'Common Stock');
    const deleteProperties = filteredData.map((stock) => ({ symbol: stock.symbol, name: stock.name }));
    try {
      Stock.insertMany(deleteProperties);
    } catch (err) {
      console.log(err);
    }
  });
};

getStocks();
```