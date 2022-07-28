const express = require('express');
const router = express.Router();
const multer = require('multer');              // multer will be used to handle the form data.
const Aws = require('aws-sdk');                // aws-sdk library will used to upload image to s3 bucket. 
const mongoose = require('mongoose');
const passport = require('passport');
require("dotenv/config");

const Challenge = require('../../models/Challenge');
const Participation = require('../../models/Participation');
const validateChallengeInput = require('../../validation/challenges');

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
    Challenge.find()
        .sort({ createdAt: -1 })
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
          if (challenge.creator.toString() === req.user.id){
            Challenge.findByIdAndRemove(req.params.id, (err, challenge) => {
              return res.status(200).json(`sucessfully deleted`)
            })
          } else 
          {
            return res.status(422).json({ invalidcredentials: `invalid credentials for deleting challenge` })
          }
        })
        .catch(err => {
          return res.status(422).json({ nochallengefound: `No challenge found with that ID` })
        })
});

// router.delete('/:id', 
//     passport.authenticate('jwt', { session: false }),
//       (req, res) => {
//         const challenge = Challenge.findById(req.params.id);
//         // console.log('challenge', challenge);
//         const keyName = path.basename(challenge.imageUrl)
//         Challenge.findById(req.params.id)
//         .then(challenge => {
//           if (challenge.creator.toString() === req.user.id){
//             Challenge.findByIdAndRemove(req.params.id)
//               .then(data => {
//                 if (!data) {
//                   return res.status(404).send({
//                     success: false,
//                     message: "Challenge not found with id " + req.params.id
//                   });
//                 }
//               }).then(() => {
//                 //Deleting the Image from the S3 bucket
//                 deleteFileStream(keyName, (error, data) => {
//                   if (error) {
//                     return res.status(500).send({
//                       success: false,
//                       message: error.message
//                     });
//                   } 
//                   res.send({
//                     success: true,
//                     message: "successfully deleted"
//                   });
//                 })
//               })
//           }
//         })
//         .catch(err => {
//           return res.status(422).json({ nochallengefound: `No challenge found with that ID` })
//         })
// });

router.post('/', upload.single('imageUrl'),
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateChallengeInput(req.body);
  
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

      s3.upload(params,(error,data)=>{
        if(error){
            res.status(500).send({"err":error})  // if we get any error while uploading error message will be returned.
        }


        const newChallenge = new Challenge({
          title: req.body.title,
          description: req.body.description,
          creator: req.user.id,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          category: req.body.category,
          imageUrl: data.Location
        });
    
        newChallenge.save().then(challenge => {
          const newPost = new Post({
            text: `I just created a challenge!`,
            type: `create`,
            user: req.user.id,
            challenge: challenge.id
          })

          newPost.save().then(post => {
            const newParticipation = new Participation({
              challenge: post.challenge,
              participant: req.user.id
            })
    
            newParticipation.save().then(participation => res.json(challenge))
          })
        });
      });
    }
);

router.patch('/:id', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Challenge.findOne({_id: req.params.id, creator: req.user.id})
    .then( challenge => {
        const { errors, isValid } = validateChallengeInput(req.body);

        if (!isValid) {
          return res.status(400).json(errors);
        }

        challenge.title = req.body.title
        challenge.description = req.body.description
        challenge.startDate = req.body.startDate
        challenge.endDate = req.body.endDate
        challenge.category = req.body.category

      challenge.save().then(challenge => res.json(challenge));
  })
  .catch(err =>
    res.status(422).json({ nochallengefound: 'No editable challenge found with that ID' }))
});


module.exports = router;