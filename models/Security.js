const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecuritySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  exchange: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now()
  },
  type: {
    type: String,
    enum: ['Share', 'Unit Trust', 'ETF', 'Bond', 'Other'],
    default: 'Share'
  },
  isTaxFree: {
    type: Boolean,
    default: false
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = Security = mongoose.model('security', SecuritySchema);
