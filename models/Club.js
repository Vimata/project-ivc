const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClubSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  clubName: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
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
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      dateJoined: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Club = mongoose.model('clubs', ClubSchema);
