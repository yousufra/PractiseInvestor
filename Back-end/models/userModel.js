const mongoose = require('./index');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  totalValue: {
    type: Number,
    "default": 50000
  },
  Cash: {
    type: Number,
    "default": 50000
  },
  Investments:{
    type: Number,
    "default": 0
  },
  holdings: {
    type: Array,
    "default": []
  },
  activities: {
    type: Array,
    "default": []
  }
}, {
  timestamps: true //creates an createdat and updated at field whenever a document is created
});
//Mongoose automatically looks for the plural, lowercased version of your model name. Thus,
// for the example above, the model Post is for the posts collection in the database.
module.exports = mongoose.model('User', userSchema);