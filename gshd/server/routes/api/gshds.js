const express = require('express');
const router = express.Router();
const GSHD = require('../../models/GSHD.js');

/*
 * @route GET /api/gshds/
 * @desc Returns all GSHDs in DB
 * --------------------------------------------
 */

router.get('/', (req, res) => {
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

/*
 * @route POST /api/gshds/add
 * @desc Adds a single GSHD
 * --------------------------------------------
 */

router.post('/add', (req, res) => {

  // Create new document (instance of a model) using data pulled from request
  const gshd = new GSHD(req.body);
  
  // Save document to DB
  gshd.save()
    .then(gshd => {
      console.log('GSHD added successfully');
      res.status(200).json({'GSHD': 'GSHD added successfully'});
    })
    .catch(err => {
      console.log(err);
      res.status(400).send('Failed to add GSHD');
    });
});


/*
 * @route GET /api/gshds/:id
 * @desc Returns single GSHD from DB by ID
 * --------------------------------------------
 */

router.get('/:id', (req, res) => {
  
  let id = req.params.id;

  GSHD.findById(id, (err, gshd) => {
    if (err) {
      res.status(500).send('Could not find GSHD with that ID');
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

/*
 * @route POST /api/gshds/update/:id
 * @desc Updates single GSHD in DB by ID
 * --------------------------------------------
 */

router.post('/update/:id', (req, res) => {
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

/*
 * @route DELETE /api/gshds/update/:id
 * @desc Deletes single GSHD from DB by ID
 * --------------------------------------------
 */

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

module.exports = router;