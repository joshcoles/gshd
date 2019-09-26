// Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const router = express.Router();
const mongoose = require('mongoose');
const GSHD = require('./models/GSHD.js');
const dbURI = require('./config/keys').mongoURI;
const passport = require('passport');
const users = require('./routes/api/users');



const upload = require('./services/file-upload.js');
const singleUpload = upload.single('gshd-image');

require('./routes/api/users.js');
require('./config/passport')(passport);


// Middleware
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api/users', users);

mongoose.set('useCreateIndex', true);

// Connect to remote DB at https://cloud.mongodb.com/etc
mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(() => console.log(`MongoDB database connection established successfully.`))
  .catch((err) => console.log(`Ohhhh no oh no something went wrong uh oh oh no`));

const connection = mongoose.connection;

// ---------------------------------------------
// GET /gshds/
// ---------------------------------------------
router.route('/').get((req, res) => {
  GSHD.find((err, gshds) => {
    if (err) {
      console.log(`
        -----------------------------------
        GSHD Error when attempting to GET /gshds/
        ${err}
      `);
    } else {
      console.log(`
        GSHD Success: request made to /gshds/
      `);
      res.json(gshds);
    }
  })
});

// ---------------------------------------------
// POST /gshds/add
// ---------------------------------------------
router.route('/add').post((req, res) => {

  // Create new document (instance of a model) using data pulled from request
  const gshd = new GSHD(req.body);
  console.log(req.body);

  // Save document to DB
  gshd.save()
    .then(gshd => {
      res.status(200).json({'GSHD': 'GSHD added successfully'});
    })
    .catch(err => {
      console.log(err);
      res.status(400).send('Failed to add GSHD');
    });
});

// ---------------------------------------------
// GET /gshds/:id
// ---------------------------------------------
router.route('/:id').get((req, res) => {
  
  let id = req.params.id;

  GSHD.findById(id, (err, gshd) => {
    if (err) {
      console.log(`
        -----------------------------------
        GSHD Error when attempting to GET /gshds/:id 
        ${err}
      `);
    } else {
      console.log(`
        GSHD Success: request made to /gshds/${id}
      `);
      res.json(gshd);
    }
  });
});

// ---------------------------------------------
// POST /update/:id
// ---------------------------------------------
router.route('/update/:id').post((req, res) => {
  let id = req.params.id;

  GSHD.findById(id, (err, gshd) => {
    if (!gshd) {
      res.status(404).send('Data is not found')
    } else {
      gshd.gshd_title = req.body.gshd_title;
      gshd.gshd_location = req.body.gshd_location;
      gshd.gshd_rating = req.body.gshd_rating;
      gshd.gshd_image = req.body.gshd_image;
      gshd.gshd_date = req.body.gshd_date;
      gshd.gshd_geometry = {
        "type": "Point",
        "_id": id,
        "coordinates": [...req.body.gshd_geometry.coordinates]
    }

      gshd.save().then(gshd => {
        res.json('GSHD Updated');
      })
      .catch(err => {
        res.status(400).send("GSHD update not possible");
      })
    }
  });
});

// ---------------------------------------------
// DELETE /delete/:id
// ---------------------------------------------
router.route('/delete/:id').delete((req, res) => {
  GSHD
    .findByIdAndDelete(req.params.id)
    .exec()
    .then(doc => {
      if (!doc) {
        return res.status(404).end();
      }

      return res.status(204).end();
    })
      .catch(error => console.log(error));
});


/* Temporary route to be used while figuring out image uploads to AWS S3 */

// ---------------------------------------------
// POST /upload/
// ---------------------------------------------
app.post('/upload', (req, res) => {

  // console.log(req);
  console.log(req.file)

  singleUpload(req, res, (err) => {
    return res.json({
      'imageUrl': req.file.location
    });
  });
});

app.use('/gshds', router);

app.listen(PORT,() => {
  console.log(`Listening on port ${PORT}`);
});