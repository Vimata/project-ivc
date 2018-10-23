const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClubProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  objective: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ClubProfile = mongoose.model(
  'clubprofiles',
  ClubProfileSchema
);
