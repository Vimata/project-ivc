const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CashAccountSchema = new Schema({
  accountName: {
    type: String,
    required: true
  },
  classification: {
    type: String,
    default: 'Bank',
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = CashAccount = mongoose.model('account', CashAccountSchema);
