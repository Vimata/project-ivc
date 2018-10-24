const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  location: {
    type: String
  },
  role: {
    type: String
  },
  bio: {
    type: String
  },
  social: {
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    linkedin: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = UserProfile = mongoose.model(
  'userprofiles',
  UserProfileSchema
);
