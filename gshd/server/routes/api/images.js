const express = require('express');
const router = express.Router();

const upload = require('../../services/file-upload.js');
const singleUpload = upload.single('gshd-image');

/*
 * @route POST /api/gshds/
 * @desc Accepts image and uploads to AWS S3, returning image URL
 * --------------------------------------------
 */

router.post('/upload', (req, res) => {
  singleUpload(req, res, (err) => {
    return res.json({
      'imageUrl': req.file.location
    });
  });
});

module.exports = router;