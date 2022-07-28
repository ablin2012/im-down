const express = require('express');
const router = express.Router();
const multer = require('multer');          
const Aws = require('aws-sdk');   
const mongoose = require('mongoose');
const passport = require('passport');

const Challenge = require('../../models/Challenge');
const Like = require('../../models/Like');
const Comment = require('../../models/Comment');

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
  .sort({ createdAt: -1 })
  .then(posts => res.json(posts))
  .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err =>
            res.status(404).json({ nopostfound: 'No post found with that ID' })
        );
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

router.post('/challenge/:challenge_id',  upload.single('imageUrl'),
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      // console.log("initial");
      const { errors, isValid } = validatePostInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const newPost = new Post({
        text: req.body.text,
        type: req.body.type,
        user: req.user.id,
        challenge: req.params.challenge_id,
      }); 

      // console.log("before", req.file)
      if (req.file) {
        // console.log("after", req.file)
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
  
      newPost.imageUrl = data.Location
      // console.log("new post after image", newPost)
      newPost.save();
    }
    
    )}
    newPost.save().then(post => {
     if (post.type === "complete"){
      Participation.findOne({challenge: post.challenge, participant: post.user})
      .then(participation => {
        participation.complete = true;
        participation.save()
      })
     }
      return res.json(post)
    });
});

router.patch('/:id', upload.single('imageUrl'),
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Post.findOne({_id: req.params.id, user: req.user.id})
        .then(post => {
            const { errors, isValid } = validatePostInput(req.body);

            if (!isValid) {
                return res.status(400).json(errors);
            }

            post.text = req.body.text
            
            // console.log("before", req.file)
            if (req.file) {
              // console.log("after", req.file)
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
        
            post.imageUrl = data.Location
            // console.log("new post after image", post)
            post.save();
          }
          
          )}

            post.save().then(post => res.json(post));
        })
        .catch(err =>
            res.status(422).json({ nopostfound: 'No post found with that ID'}))
});

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

router.get('/:id/comments', (req, res) => {
  Comment.find()
  .sort({ createdAt: -1 })
  .then(comments => res.json(comments))
  .catch(err => res.status(404).json({ nocommentsfound: 'No comments found' }));
});

router.get('/:id/comment/:comment_id', (req, res) => {
    Comment.findById(req.params.comment_id)
        .then(comment_id => res.json(comment_id))
        .catch(err =>
            res.status(404).json({ nocomment_idfound: 'No comment_id found with that ID' })
        );
});

router.post('/:id/comments',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const newComment = new Comment({
        text: req.body.text,
        user: req.user.id,
        post: req.params.id
      });
  
      newComment.save()
      .then(comment => res.json(comment))
      .catch(err => res.status(400).send(err))
    }
);

router.patch('/:id/comment/:comment_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Comment.findOne({_id: req.params.comment_id, user: req.user.id})
        .then(comment => {
            comment.text = req.body.text
            comment.save().then(comment => res.json(comment));
        })
        .catch(err =>
            res.status(422).json({ nocommentfound: 'No comment found with that ID'}))
});

router.delete('/:id/comment/:comment_id', 
    passport.authenticate('jwt', { session: false }),
      (req, res) => {
        Comment.findById(req.params.comment_id)
        .then(comment => {
          if (comment.user.toString() === req.user.id){
            Comment.findByIdAndRemove(req.params.comment_id, (err, comment) => {
              return res.status(200).json(`sucessfully deleted comment`)
            })
          } else 
          {
            return res.status(422).json({ invalidcredentials: `invalid credentials for deleting comment` })
          }
        })
        .catch(err => {
          return res.status(422).json({ nocommentfound: `No comment found with that ID` })
        })
});

router.get('/:id/likes', (req, res) => {
  Like.find()
  .sort({ createdAt: -1 })
  .then(likes => res.json(likes))
  .catch(err => res.status(404).json({ nolikesfound: 'No likes found' }));
});


router.post('/:id/likes',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const newLike = new Like({
        text: req.body.text,
        user: req.user.id,
        post: req.params.id
      });
  
      newLike.save()
      .then(like => res.json(like))
      .catch(err => {
          if (err.code = 11000) {
              return res.status(422).send("already liked this post");
          }
          return res.status(400).send(err)
      })
    }
);

router.delete('/:id/like/:like_id', 
    passport.authenticate('jwt', { session: false }),
      (req, res) => {
        Like.findById(req.params.like_id)
        .then(like => {
          if (like.user.toString() === req.user.id){
            Like.findByIdAndRemove(req.params.like_id, (err, like) => {
              return res.status(200).json(`sucessfully deleted like`)
            })
          } else 
          {
            return res.status(422).json({ invalidcredentials: `invalid credentials for deleting like` })
          }
        })
        .catch(err => {
          return res.status(422).json({ nolikefound: `No like found with that ID` })
        })
});

module.exports = router;