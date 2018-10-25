const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load input validation
const validateUserProfileInput = require('../../validation/userprofile');

//Load models
const User = require('../../models/User');
const UserProfile = require('../../models/UserProfile');
const Club = require('../../models/Club');

//@route  GET to api/profile/test
//@desc   Tests profile route
//@access Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

//@route  GET to api/profile/all
//@desc   Get all user profiles
//@access Public
router.get('/user/all', (req, res) => {
  const errors = {};
  UserProfile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no club profiles';
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err =>
      res.status(404).json({ profiles: 'There are no club profiles' })
    );
});

//@route  GET to api/profile/email/:email
//@desc   Get profile by email
//@access Public
router.get('/email/:email', (req, res) => {
  const errors = {};

  Profile.findOne({ email: req.params.email })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//@route  GET to api/profile/user/:user_id
//@desc   Get profile by user id
//@access Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  UserProfile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

//@route  POST to api/profiles/user
//@desc   Create and edit current users profile
//@access Private
router.post(
  '/user',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateUserProfileInput(req.body);
    //Check validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }
    //Get fields
    const userProfileFields = {};
    userProfileFields.user = req.user.id;

    if (req.body.role) userProfileFields.role = req.body.role;
    if (req.body.location) userProfileFields.location = req.body.location;
    if (req.body.bio) userProfileFields.bio = req.body.bio;

    //Social - initialize to empty object
    userProfileFields.social = {};

    if (req.body.twitter) userProfileFields.social.twitter = req.body.twitter;
    if (req.body.facebook)
      userProfileFields.social.facebook = req.body.facebook;
    if (req.body.instagram)
      userProfileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin)
      userProfileFields.social.linkedin = req.body.linkedin;

    UserProfile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        UserProfile.findOneAndUpdate(
          { user: req.user.id },
          { $set: userProfileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create
        //Save profile
        new UserProfile(userProfileFields)
          .save()
          .then(profile => res.json(profile));
      }
    });
  }
);

//@route  DELETE to api/profile
//@desc   Delete user and profile
//@access Private
router.delete(
  '/user',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    UserProfile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      })
      .catch(err => res.status(404).json(err));
  }
);
module.exports = router;
