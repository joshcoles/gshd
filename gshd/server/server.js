// Express basics && boilerplate
const express = require('express');
const app = express();
const PORT = 4000;
const bodyParser = require('body-parser');
const cors = require('cors');

// Database
const mongoose = require('mongoose');
const dbURI = require('./config/keys').mongoURI;

// Routes
const userRoutes = require('./routes/api/users');
const gshdRoutes = require('./routes/api/gshds');
const imageRoutes = require('./routes/api/images');

// Authentication
const passport = require('passport');
require('./config/passport')(passport);

// Middleware
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Set up middleware for different sets of routes
app.use('/api/users', userRoutes);
app.use('/api/gshds', gshdRoutes);
app.use('/api/images', imageRoutes);

// Connect to remote DB at https://cloud.mongodb.com/etc
mongoose.set('useCreateIndex', true);
mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(() => console.log(`MongoDB database connection established successfully.`))
  .catch((err) => console.log(`Ohhhh no oh no something went wrong uh oh oh no`));

app.listen(PORT,() => {
  console.log(`Listening on port ${PORT}`);
});