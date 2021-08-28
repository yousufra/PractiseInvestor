const mongoose = require('./index');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cash: {
    type: Number,
    default: 50000,
  },
  holdings: {
    type: Array,
    default: [],
  },
  activities: {
    type: Array,
    default: [],
  },
  totalValueHistory: {
    type: Array,
    default: [], 
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);