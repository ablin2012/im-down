const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Challenge = require('../../models/Challenge');
const validateChallengeInput = require('../../validation/challenges');

router.get('/', (req, res) => {
    Challenge.find()
        .sort({ date: -1 })
        .then(challenges => res.json(challenges))
        .catch(err => res.status(404).json({ nochallengesfound: 'No challenges found' }));
});

router.get('/user/:user_id', (req, res) => {
    Challenge.find({creator: req.params.user_id})
        .then(challenges => res.json(challenges))
        .catch(err =>
            res.status(404).json({ nochallengesfound: 'No challenges found from that user' }
        )
    );
});

router.get('/:id', (req, res) => {
    Challenge.findById(req.params.id) 
        .then(challenge => res.json(challenge))
        .catch(err =>
            res.status(404).json({ nochallengefound: 'No challenge found with that ID' })
        );
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateChallengeInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newChallenge = new Challenge({
        title: req.body.title,
        description: req.body.description,
        creator: req.user.id,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        category: req.body.category
      });
  
      newChallenge.save().then(challenge => res.json(challenge));
    }
  );

  module.exports = router;