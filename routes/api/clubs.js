const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Club model
const Club = require('../../models/Club');
const UserProfile = require('../../models/UserProfile');
const User = require('../../models/User');
const CashAccount = require('../../models/CashAccount');

//Validation
const validateClubInput = require('../../validation/clubs');
const validateCashAccountInput = require('../../validation/clubs');

//@route  GET to api/clubs/test
//@desc   Tests club route
//@access Public
router.get('/test', (req, res) => res.json({ msg: 'Club Works' }));

//@route  GET to api/clubs
//@desc   Get all clubs
//@access Public
router.get('/', (req, res) => {
  Club.find()
    .sort({ date: -1 })
    .then((clubs) => res.json(clubs))
    .catch((err) => res.status(404).json({ noclubsfound: 'No clubs found' }));
});

//@route  GET to api/clubs/:id
//@desc   Get club by ID
//@access Public
router.get('/:id', (req, res) => {
  Club.findById(req.params.id)
    .populate('creator', ['name', 'avatar', 'isAdmin'])
    .populate('members.user', ['name', 'avatar', 'isAdmin'])
    .then((clubs) => res.json(clubs))
    .catch((err) =>
      res.status(404).json({ noclubfound: 'No club found with that ID' })
    );
});

//@route  POST to api/clubs
//@desc   Create club
//@access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateClubInput(req.body);
    //Check validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Club.findOne({ clubName: req.body.clubName })
      .then((club, user) => {
        if (club) {
          errors.clubName = 'Club name already exists';
          return res.status(400).json(errors);
        }
        const creator = req.user.id;
        creator.isAdmin = true;
        const newClub = new Club({
          clubName: req.body.clubName,
          avatar: req.body.avatar,
          creator: req.user.id,
          objective: req.body.objective,
          location: req.body.location,
        });

        if (newClub.clubName) newClub.members.unshift({ user: req.user.id });

        newClub.save().then((club) => res.json(club));
      })
      .catch((err) => console.log(err));
  }
);

//@route  DELETE to api/clubs/:id
//@desc   Delete club by ID
//@access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    UserProfile.findOne({ user: req.user.id }).then((profile) => {
      Club.findById(req.params.id)
        .then((club) => {
          //Check for club owner
          if (club.creator.toString() !== req.user.id) {
            return res.status(401).json({
              notauthorized: 'You are not authorized to delete this club',
            });
          }
          //Delete
          club.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ clubnotfound: 'Club was not found' })
        );
    });
  }
);

//@route  POST to api/clubs/:id/join
//@desc   Join club
//@access Private
router.post(
  '/:id/join',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    UserProfile.findOne({ user: req.user.id })
      .then(() => {
        Club.findById(req.params.id)
          .then((club) => {
            if (
              club.members.filter(
                (member) => member.user.toString() === req.user.id
              ).length > 0 ||
              club.creator.toString() === req.user.id
            ) {
              return res.status(400).json({
                alreadymember: 'You are already a member of this club',
              });
            }
            //Add user id to members array
            club.members.unshift({ user: req.user.id });
            club.save().then((club) => res.json(club));
          })
          .catch((err) =>
            res.status(404).json({ clubnotfound: 'Club was not found' })
          );
      })
      .catch((err) =>
        res.status(404).json({ profilenotfound: 'User profile was not found' })
      );
  }
);

//@route  POST to api/clubs/:id/leave
//@desc   Leave club
//@access Private
router.post(
  '/:id/leave',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    UserProfile.findOne({ user: req.user.id }).then((profile) => {
      Club.findById(req.params.id)
        .then((club) => {
          if (
            club.members.filter(
              (member) => member.user.toString() === req.user.id
            ).length === 0
          ) {
            return res
              .status(400)
              .json({ notmember: 'You are not a member of this club' });
          }
          //Get remove index
          const removeIndex = club.members.map((item) =>
            item.user.toString().indexOf(req.user.id)
          );

          //Splice out of array
          club.members.splice(removeIndex, 1);

          //Save
          club.save().then((club) => res.json(club));
        })
        .catch((err) =>
          res.status(404).json({ clubnotfound: 'Club was not found' })
        );
    });
  }
);

module.exports = router;
