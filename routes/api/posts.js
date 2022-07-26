const express = require('express');
const router = express.Router();
const multer = require('multer');          
const Aws = require('aws-sdk');   
const mongoose = require('mongoose');
const passport = require('passport');
require("dotenv/config");

const Post = require('../../models/Post');
const validatePostInput = require('../../validation/posts');

// AWS Stuff
const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
      cb(null, '')
  }
});

const filefilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      cb(null, true)
  } else {
      cb(null, false)
  }
}

const upload = multer({ storage: storage, fileFilter: filefilter });

const s3 = new Aws.S3({
  accessKeyId:process.env.AWS_ACCESS_KEY_ID,              // accessKeyId that is stored in .env file
  secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET       // secretAccessKey is also store in .env file
})


// Routes
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

router.post('/challenge/:challenge_id',  upload.single('postImage'),
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validatePostInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const params = {
        Bucket:process.env.AWS_BUCKET_NAME,      // bucket that we made earlier
        Key:req.file.originalname,               // Name of the image
        Body:req.file.buffer,                    // Body which will contain the image in buffer format
        ACL:"public-read-write",                 // defining the permissions to get the public link
        ContentType:"image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
      };

      s3.upload(params,(error,data) => {
        if(error){
            res.status(500).send({"err":error})  // if we get any error while uploading error message will be returned.
        }
  
        const newPost = new Post({
            text: req.body.text,
            type: req.body.type,
            user: req.user.id,
            challenge: req.params.challenge_id,
            postImage: data.Location
        });
    
        newPost.save().then(post => res.json(post));
    })
});

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