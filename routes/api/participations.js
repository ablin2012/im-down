const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Participation = require('../../models/Participation');


router.get('/', (req, res) => {
    Participation.find()
        .sort({ createdAt: -1 })
        .then(participations => res.json(participations))
        .catch(err => res.status(404).json({ noparticipationsfound: 'No participations found' }));
});

router.get('/:id', (req, res) => {
    Participation.findById(req.params.id) 
        .then(participation => res.json(participation))
        .catch(err =>
            res.status(404).json({ noparticipationfound: 'No participation found with that ID' })
        );
});

// router.get('/user/:user_id', (req, res) => {
//     Participation.find({participant: req.params.user_id})
//         .then(participations => res.json(participations))
//         .catch(err =>
//             res.status(404).json({ noparticipationsfound: 'No participations found for that user' }
//         )
//     );
// });

router.get('/user/:user_id', (req, res) => {
  Participation.find({participant: req.params.user_id})
      .populate("challenge")
      .then(data => res.json(data))
      .catch(err => res.json(err))
});

router.get('/challenge/:challenge_id', (req, res) => {
  Participation.find({challenge: req.params.challenge_id})
      .populate("participant")
      .then(data => res.json(data))
      .catch(err => res.json(err))
});


// router.get('/challenge/:challenge_id', (req, res) => {
//     Participation.find({challenge: req.params.challenge_id})
//         .then(participations => res.json(participations))
//         .catch(err =>
//             res.status(404).json({ noparticipationsfound: 'No participations found for that challenge' }
//         )
//     );
// });

router.delete('/:id', 
    passport.authenticate('jwt', { session: false }),
      (req, res) => {
        Participation.findById(req.params.id)
        .then(participation => {
          // console.log("participation find by id", participation.user.toString())
          
          if (participation.participant.toString() === req.user.id){
            Participation.findByIdAndRemove(req.params.id, (err, participation) => {
              // console.log("error1:", err)
              return res.status(200).json(`sucessfully withdrew participation`)
            })
          } else 
          {
            // console.log("error2:", err)
            return res.status(422).json({ invalidcredentials: `invalid credentials for withdrawing participation for this user` })
          }
        })
        .catch(err => {
          // console.log("error3:", err)
          return res.status(422).json({ noparticipationfound: `No participation found with that ID` })
        })
});

router.post('/challenge/:challenge_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

      const newParticipation = new Participation({
        participant: req.user.id,
        challenge: req.params.challenge_id
      });
  
      newParticipation.save().then(participation => {
        const newPost = new Post({
            text: `${req.user.username} just joined the challenge!`,
            type: `participate`,
            user: req.user.id,
            challenge: participation.challenge._id
        })
  
        newPost.save()
        .then(post => res.json(participation))
        .catch(err => {
            if (err.code = 11000) {
                return res.status(422).json("already participating in this challenge");
            }
            return res.status(400).json(err)
        })
    })
    .catch(err => {
      if (err.code = 11000) {
          return res.status(422).json("already participating in this challenge");
      }
      return res.status(400).json(err)
    })
});

module.exports = router;