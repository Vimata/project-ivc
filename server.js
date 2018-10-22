const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 5500;

//BodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;
mongoose.connect(
  db,
  { useNewUrlParser: true }
);

app.get('/', (req, res) => {
  res.send('Hello there...');
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
