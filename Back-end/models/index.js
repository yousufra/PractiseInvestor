/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL || '';

mongoose.connect("mongodb://localhost:27017/practiseInvestor", { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => console.log('Connected to DB!'),
  (err) => console.log(`Could not connect to DB: ${err}`),
);

// to remove deprecated log for findoneandupdate
mongoose.set('useFindAndModify', false);

module.exports = mongoose;
