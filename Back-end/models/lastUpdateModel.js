const mongoose = require('./index');

// tracks last update of Ranking and users' totalValueHistory
const lastUpdateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    index: true,
  },
});

module.exports = mongoose.model('LastUpdate', lastUpdateSchema);
