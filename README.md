# PractiseInvestor
<!-- ABOUT THE PROJECT -->
## About The Project

Pactise Investor allows users to buy and sell stock with real-time stock market prices with fake money. Allows users to practise investing with zero risk, has features such as porfolio diversity metrics, stock holdings metrics, top news in the stock market and a application ranking feature to add a gamified twist.

## Contributor
* Rahmat Yousufi [![LinkedIn][linkedin-shield]](https://www.linkedin.com/in/rahmatyousufi/)

### Built With
The technologies we used in the development of this project:
* Front End: [React](https://reactjs.org/), [Redux](https://redux.js.org/), [Material UI](https://material-ui.com/), [Axios](https://axios-http.com/)
* Back End: [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/), [NodeJS](https://nodejs.org/en/), [Express](http://expressjs.com/)
* Others: [JWT](https://jwt.io/)

## Getting Started

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. You will need an api key from
* [TwelveData](https://twelvedata.com/) 
3. You will need a Postgres database running.
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/tutorworld.git
   ```
3. Install NPM packages in both client and server folders:
   ```sh
   tutorworld/client % npm install

   tutorworld/server % npm install
   ```
4. Create `server/.env` using `server/.env.example` as a template.

5. Create `client/.env` using `client/.env.example` as a template.

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png



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
