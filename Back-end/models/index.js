require('dotenv').config();
const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL || '';

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// to remove deprecated log for findoneandupdate
mongoose.set('useFindAndModify', false);

module.exports = mongoose;
