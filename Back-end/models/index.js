require('dotenv').config();
const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL || '';

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false); //to remove deprecated log for findoneandupdate

module.exports = mongoose;