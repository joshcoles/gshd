const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const gshdRoutes = express.Router();
const mongoose = require('mongoose');
let GSHD = require('./gshd.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/gshd', ({ useNewUrlParser: true }));
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully.");
});

gshdRoutes.route('/').get((req, res) => {
  GSHD.find((err, gshds) => {
    if (err) {
      console.log(err);
    } else {
      res.json(gshds);
    }
  })
});

gshdRoutes.route('/:id').get((req, res) => {
  let id = req.params.id;
  GSHD.findById(id, (err, gshd) => {
    res.json(gshd);
  });
});

gshdRoutes.route('/add').post((req, res) => {
  const gshd = new GSHD(req.body);
  gshd.save()
    .then(gshd => {
      res.status(200).json({'GSHD': 'GSHD added successfully'});
    })
    .catch(err => {
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