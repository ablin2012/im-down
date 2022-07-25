const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Challenge = require('../../models/Challenge');
const Participation = require('../../models/Participation');
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
            res.status(404).json({ nochallengesfound: 'No challenges found for that user' }
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

router.delete('/:id', 
    passport.authenticate('jwt', { session: false }),
      (req, res) => {
        Challenge.findById(req.params.id)
        .then(challenge => {
          // console.log("challenge find by id", challenge.user.toString())
          
          if (challenge.creator.toString() === req.user.id){
            Challenge.findByIdAndRemove(req.params.id, (err, challenge) => {
              // console.log("error1:", err)
              // if (err) return res.status(500).json({ nochallengefound: `Unable to delete challenge ${req.params.id} ${req.user.id}` })
              return res.status(200).json(`sucessfully deleted`)
            })
          } else 
          {
            // console.log("error2:", err)
            return res.status(422).json({ invalidcredentials: `invalid credentials for deleting challenge` })
          }
        })
        .catch(err => {
          // console.log("error3:", err)
          return res.status(422).json({ nochallengefound: `No challenge found with that ID` })
        })
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
  
      newChallenge.save().then(challenge => {
        const newParticipation = new Participation({
          challenge: challenge.id,
          participant: req.user.id
        })

        newParticipation.save()
        .then(res.json(challenge))
      });

    }
);

  router.patch('/:id', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log("req", req)
    console.log("id", req.params.id)
    console.log( "userid", req.user.id)
    Challenge.findOne({_id: req.params.id, creator: req.user.id})
    .then( challenge => {
        const { errors, isValid } = validateChallengeInput(req.body);

        if (!isValid) {
          return res.status(400).json(errors);
        }

        challenge.title = req.body.title
        challenge.description = req.body.description
        challenge.creator = req.user.id
        challenge.startDate = req.body.startDate
        challenge.endDate = req.body.endDate
        challenge.category = req.body.category

        challenge.save().then(challenge => res.json(challenge));
    })
    .catch(err =>
      res.status(422).json({ nochallengefound: 'No editable challenge found with that ID' }))
});

module.exports = router;