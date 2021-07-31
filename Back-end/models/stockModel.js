const mongoose = require('./index');

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model('Stock', stockSchema);
