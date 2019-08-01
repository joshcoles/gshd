// Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const gshdRoutes = express.Router();
const mongoose = require('mongoose');
const GSHD = require('./gshd.model');

// Middleware
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/gshd', ({ useNewUrlParser: true }));
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully.");
});

// ---------------------------------------------
// GET /gshds/
// ---------------------------------------------
gshdRoutes.route('/').get((req, res) => {
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
// GET /gshds/:id
// ---------------------------------------------
gshdRoutes.route('/:id').get((req, res) => {
  
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
// POST /gshds/add
// ---------------------------------------------
gshdRoutes.route('/add').post((req, res) => {

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

gshdRoutes.route('/update/:id').post((req, res) => {
  let id = req.params.id;
  GSHD.findById(id, (err, gshd) => {
    if (!gshd) {
      res.status(404).send('Data is not found')
    } else {
      gshd.gshd_title = req.body.gshd_title;
      gshd.gshd_location = req.body.gshd_location;
      gshd.gshd_rating = req.body.gshd_rating;
      gshd.gshd_image = req.body.gshd_image;

      gshd.save().then(gshd => {
        res.json('GSHD Updated');
      })
      .catch(err => {
        res.status(400).send("GSHD update not possible");
      })
    }
  });
});

app.use('/gshds', gshdRoutes);

app.listen(PORT,() => {
  console.log(`Listening on port ${PORT}`);
});