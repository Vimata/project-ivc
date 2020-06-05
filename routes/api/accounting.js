const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Add cash account type
//Club model
const CashAccount = require('../../models/CashAccount');
const Club = require('../../models/Club');
const User = require('../../models/User');

//Validation
const validateCashAccountInput = require('../../validation/cashAccount');

//@route  POST to api/clubs/:id/accounting/cash-account
//@desc   Create cash account
//@access Private
router.post(
  '/cash-account',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //const { errors, isValid } = validateClubInput(req.body);
    const { errors, isValid } = validateCashAccountInput(req.body);
    //Check validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }

    User.findOne({ user: req.user.id }).then(() => {
      Club.findById(req.params.id)
        .then(() => {
          CashAccount.findOne({ accountName: req.body.accountName }).then(
            (name) => {
              if (name) {
                errors.accountName = 'Account name already exists';
                return res.status(400).json(errors);
              }
              //

              const newAccount = new CashAccount({
                accountName: req.body.accountName,
                classification: req.body.classification,
                creator: req.user.id,
              });

              newAccount.save().then((account) => res.json(account));
            }
          );
        })
        .catch((err) => console.log(err));
    });
  }
);
//Edit cash account type

/* TODO */

//Delete cash account type

/* TODO */

// New member deposit
//@route  POST to api/clubs/:id/accounting/deposit
//@desc   Deposit to a cash account
//@access Private
router.post(
  '/deposit',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //const { errors, isValid } = validateClubInput(req.body);
    const { errors, isValid } = validateDepositInput(req.body);
    //Check validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }

    User.findOne({ user: req.body.name }).then(() => {
      Club.findById(req.params.id)
        .then(() => {
          Club.findOne({ accountName: req.body.accountName }).then((name) => {
            if (name) {
              errors.accountName = 'Account name already exists';
              return res.status(400).json(errors);
            }
            //

            const newAccount = new CashAccount({
              accountName: req.body.accountName,
              classification: req.body.classification,
              creator: req.user.id,
            });

            newAccount.save().then((account) => res.json(account));
          });
        })
        .catch((err) => console.log(err));
    });
  }
);

module.exports = router;
