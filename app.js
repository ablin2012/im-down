const express = require("express");
const app = express();
const db = require('./config/keys_dev').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require("./routes/api/users");
const challenges = require("./routes/api/challenges");
const posts = require("./routes/api/posts")
const participations = require("./routes/api/participations")


mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.json("I'm Down!"));
app.use("/api/users", users);
app.use("/api/challenges", challenges);
app.use("/api/posts", posts);
app.use("/api/participations", participations);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));