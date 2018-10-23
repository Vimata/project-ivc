const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const clubs = require('./routes/api/clubs');

const app = express();

//BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());
//Passport Config
require('./config/passport')(passport);

//Use Routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/clubs', clubs);

app.get('/', (req, res) => {
  res.send('Hello there...');
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on ${port}`));
