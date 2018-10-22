const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClubSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  CreatedOn: {
    type: Date,
    default: Date.now
  },
  members: [
    {
      member: {
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
