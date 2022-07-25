const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Challenge = require('../../models/Challenge');

const Post = require('../../models/Post');
const validatePostInput = require('../../validation/posts');

router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

router.get('/user/:user_id', (req, res) => {
    Post.find({user: req.params.user_id})
        .then(posts => res.json(posts))
        .catch(err =>
            res.status(404).json({ nopostsfound: 'No posts found from that user' }
        )
    );
});

router.get('/challenge/:challenge_id', (req, res) => {
    Post.find({challenge: req.params.challenge_id})
        .then(posts => res.json(posts))
        .catch(err =>
            res.status(404).json({ nopostsfound: 'No posts for this challenge' }
        )
    );
});

router.get('/user/:user_id/challenge/:challenge_id', (req, res) => {
    Post.find({user: req.params.user_id, challenge: req.params.challenge_id})
        .then(posts => res.json(posts))
        .catch(err =>
            res.status(404).json({ nopostsfound: 'No posts for this challenge from user' }
        )
    );
});

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err =>
            res.status(404).json({ nopostfound: 'No post found with that ID' })
        );
});

router.post('/challenge/:challenge_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validatePostInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newPost = new Post({
        text: req.body.text,
        type: req.body.type,
        user: req.user.id,
        challenge: req.params.challenge_id
      });
  
      newPost.save().then(post => res.json(post));
    }
);

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Post.findOne({_id: req.params.id, user: req.user.id})
        .then(post => {
            const { errors, isValid } = validatePostInput(req.body);

            if (!isValid) {
                return res.status(400).json(errors);
            }

            post.text = req.body.text

            post.save().then(post => res.json(post));
        })
        .catch(err =>
            res.status(422).json({ nopostfound: 'No post found with that ID'}))
})

router.delete('/:id', 
    passport.authenticate('jwt', { session: false }),
      (req, res) => {
        Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() === req.user.id){
            Post.findByIdAndRemove(req.params.id, (err, post) => {
              return res.status(200).json(`sucessfully deleted`)
            })
          } else 
          {
            return res.status(422).json({ invalidcredentials: `invalid credentials for deleting post` })
          }
        })
        .catch(err => {
          return res.status(422).json({ nopostfound: `No post found with that ID` })
        })
});

module.exports = router;