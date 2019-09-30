// Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
// const router = express.Router();
const mongoose = require('mongoose');
// const GSHD = require('./models/GSHD.js');
const dbURI = require('./config/keys').mongoURI;
const passport = require('passport');

const userRoutes = require('./routes/api/users');
const gshdRoutes = require('./routes/api/gshds');
const imageRoutes = require('./routes/api/images');

const upload = require('./services/file-upload.js');
// const singleUpload = upload.single('gshd-image');

require('./routes/api/users.js');
require('./config/passport')(passport);

// Middleware
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/users', userRoutes);
app.use('/api/gshds', gshdRoutes);
app.use('/api/images', imageRoutes);

mongoose.set('useCreateIndex', true);

// Connect to remote DB at https://cloud.mongodb.com/etc
mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(() => console.log(`MongoDB database connection established successfully.`))
  .catch((err) => console.log(`Ohhhh no oh no something went wrong uh oh oh no`));

const connection = mongoose.connection;

app.listen(PORT,() => {
  console.log(`Listening on port ${PORT}`);
});