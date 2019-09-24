// Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const gshdRoutes = express.Router();
const mongoose = require('mongoose');
const GSHD = require('./gshd.model');

const upload = require('./services/file-upload.js');
const singleUpload = upload.single('gshd-image');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.set('useCreateIndex', true);

// Connection to local DB that is no longer being used
// mongoose.connect('mongodb://127.0.0.1:27017/gshd', ({ useNewUrlParser: true }));

mongoose.connect(`mongodb+srv://${process.env.MONGODB_CLOUD_USERNAME}:${process.env.MONGODB_CLOUD_PASSWORD}@gshd-mxrpx.mongodb.net/gshd-db?retryWrites=true&w=majority`)
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
// POST /update/:id
// ---------------------------------------------
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
gshdRoutes.route('/delete/:id').delete((req, res) => {
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

app.use('/gshds', gshdRoutes);

app.listen(PORT,() => {
  console.log(`Listening on port ${PORT}`);
});