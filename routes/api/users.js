const express = require("express");
const router = express.Router();
const User = require('./../../models/User');
const Post = require('./../../models/Post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const multer = require('multer');         
const Aws = require('aws-sdk'); 
require("dotenv/config")

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// const SESSION_EXPIRE_TIMER = 3600
const SESSION_EXPIRE_TIMER = 36000000

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

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      imageUrl: req.user.imageUrl
    });
})

router.get('/', (req, res) => {
  User.find()
  .sort({ username: 1 })
  .then(users => res.json(users))
  .catch(err => res.status(404).json({ nousersfound: 'No users found' }));
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err =>
            res.status(404).json({ nouserfound: 'No user found with that ID' })
        );
});

router.get('/:id/achievements', (req, res) => {
  Post.find({user: req.params.id, type: "complete"})
      .then(posts => res.json(posts))
      .catch(err =>
          res.status(404).json({ noachievementsfound: 'No achievements found for that user' })
      );
});

router.post("/register", upload.single('imageUrl'), (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = "Email already exists";

        return res.status(400).json(errors);
        // return res.status(400).json("User already exists")
      } 

      User.findOne({ username: req.body.username }).then(user => {
        if (user) {
          errors.username = "Username already exists";
          return res.status(400).json(errors);
        }

        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        }); 
  
        if (req.file) {
          const params = {
            Bucket:process.env.AWS_BUCKET_NAME,      // bucket that we made earlier
            Key:req.file.originalname,               // Name of the image
            Body:req.file.buffer,                    // Body which will contain the image in buffer format
            ACL:"public-read-write",                 // defining the permissions to get the public link
            ContentType:"image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
          };
          
          s3.upload(params,(error,data)=>{
            if(error){
              res.status(500).send({"err":error})  // if we get any error while uploading error message will be returned.
            }
            newUser.imageUrl = data.Location
          })
        }
  
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const payload = { id: user.id, email: user.email };
      
                jwt.sign(payload, keys.secretOrKey, { expiresIn: SESSION_EXPIRE_TIMER }, (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                });
              })
              .catch(err => res.status(400).json(err));
          });
        });
          
      })
          
          
    })
});
  
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const email = req.body.email;
    const password = req.body.password;
  
    User.findOne({ email }).then(user => {
      if (!user) {
        errors.email = "This user does not exist";
        return res.status(400).json(errors);
      }
  
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = { id: user.id, username: user.username };
  
          jwt.sign(payload, keys.secretOrKey, { expiresIn: SESSION_EXPIRE_TIMER }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        } else {

          errors.password = "Incorrect password";
          return res.status(400).json(errors);

        };
      });
    });
});

router.patch('/current', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOne({_id: req.user.id})
    .then( updateUser => {
        const { errors, isValid } = validateRegisterInput(req.body);

        if (!isValid) {
          return res.status(400).json(errors);
        }

        User.findOne({ email: req.body.email }).then(existingUser => {
          if (existingUser) {
            errors.email = "Email already exists";
            return res.status(400).json(errors);
          } 
    
          User.findOne({ username: req.body.username }).then(existingUser => {
            if (existingUser) {
              errors.username = "Username already exists";
              return res.status(400).json(errors);
            }
    
          
            updateUser.username = req.body.username,
            updateUser.email = req.body.email,
            updateUser.password = req.body.password

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(updateUser.password, salt, (err, hash) => {
                if (err) throw err;
                updateUser.password = hash;
                updateUser
                  .save()
                  .then(user => {
                    return res.status(200).json("sucessfully updated user information")
      
                  })
                  .catch(err => res.status(400).json(err));
              });
            });
          
          })
        })
  })
  .catch(err =>
    res.status(422).json({ nouserfound: 'No user found with that ID' }))
});


router.delete('/current', 
    passport.authenticate('jwt', { session: false }),
      (req, res) => {
        const challenge = Challenge.findById(req.params.id);
        console.log('challenge', challenge);
        const keyName = path.basename(challenge.imageUrl)
        Challenge.findById(req.params.id)
        .then(challenge => {
          if (challenge.creator.toString() === req.user.id){
            Challenge.findByIdAndRemove(req.params.id)
              .then(data => {
                if (!data) {
                  return res.status(404).send({
                    success: false,
                    message: "Challenge not found with id " + req.params.id
                  });
                }
              }).then(() => {
                //Deleting the Image from the S3 bucket
                deleteFileStream(keyName, (error, data) => {
                  if (error) {
                    return res.status(500).send({
                      success: false,
                      message: error.message
                    });
                  } 
                  res.send({
                    success: true,
                    message: "successfully deleted"
                  });
                })
              })
          }
        })
        .catch(err => {
          return res.status(422).json({ nochallengefound: `No challenge found with that ID` })
        })
});

module.exports = router;