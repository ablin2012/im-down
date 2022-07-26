const express = require("express");
const router = express.Router();
const User = require('./../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const multer = require('multer');         
const Aws = require('aws-sdk'); 
require("dotenv/config")

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

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

//Routes 
router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      imageUrl: req.user.imageUrl
    });
})

router.post("/register", upload.single('imageUrl'), (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = "User already exists";
        return res.status(400).json(errors);
        // return res.status(400).json("User already exists")
      } else {

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

          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            imageUrl: data.Location
          }); 
    
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  const payload = { id: user.id, email: user.email };
    
                  jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    res.json({
                      success: true,
                      token: "Bearer " + token
                    });
                  });
                })
                .catch(err => console.log(err));
            });
          });
        }
      )}
    });
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
  
          jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
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


module.exports = router;