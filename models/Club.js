const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClubSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  clubName: {
    type: String,
    required: true,
    unique: true
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
    type: String,
    enum: ['Active', 'Inactive', 'Suspended']
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
  ],

  memberAccounts: [
    {
      deposit: {
        account: {
          type: Schema.Types.ObjectId,
          ref: 'account'
        },
        amount: {
          type: String,
          required: true
        },
        member: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        date: {
          type: Date,
          default: Date.now
        },
        transactionType: {
          type: String,
          default: 'Cash Deposit'
        }
      },
      withdrawal: {
        member: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        type: {
          type: String,
          enum: ['Full', 'Partial'],
          default: 'Full',
          required: true
        },
        announcementDate: {
          type: Date,
          default: Date.now
        },
        payoutDate: {
          date: {
            type: Date,
            default: Date.now
          }
        },
        transactionType: {
          type: String,
          default: 'Cash Withdrawal'
        }
      },
      fee: {
        account: {
          type: Schema.Types.ObjectId,
          ref: 'account'
        },
        amount: {
          type: String,
          required: true
        },
        member: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        date: {
          type: Date,
          default: Date.now
        },
        transactionType: {
          type: String,
          default: 'Expense'
        }
      },
      beginBalance: {
        units: {
          type: String,
          required: true
        },
        amount: {
          type: String,
          required: true
        },
        member: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        type: {
          type: String,
          enum: ['Paid In', 'Earnings'],
          default: 'Paid In',
          required: true
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    }
  ],
  securities: [
    {
      buy: {
        security: {
          type: Schema.Types.ObjectId,
          ref: 'security'
        },
        numberOfSharesBought: {
          type: String,
          required: true
        },
        commission: {
          type: String
        },
        otherFees: {
          type: String
        },
        account: {
          type: Schema.Types.ObjectId,
          ref: 'account'
        },
        date: {
          type: Date,
          default: Date.now
        },
        transactionType: {
          type: String,
          default: 'Buy Security'
        }
      },
      sell: {
        symbol: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          default: Date.now
        },
        numberOfSharesSold: {
          type: String,
          required: true
        },
        grossSellAmount: {
          type: String,
          required: true
        },
        commission: {
          type: String
        },
        otherFees: {
          type: String
        },
        netProceeds: {
          type: String,
          required: true
        },
        account: {
          type: Schema.Types.ObjectId,
          ref: 'account'
        },
        comments: {
          type: String
        },
        reasonForSale: {
          type: String
        },
        transactionType: {
          type: String,
          default: 'Sell Security'
        }
      }
    }
  ]
});

module.exports = Club = mongoose.model('clubs', ClubSchema);
