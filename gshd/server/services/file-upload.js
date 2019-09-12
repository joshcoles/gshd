const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
var findConfig = require('find-config');

// Use findConfig package to find closest .env in parent directory
require('dotenv').config({ 
  path: findConfig('.env') 
});

const s3 = new aws.S3();

aws.config.update({
  secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
  accessKeyId: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2'
});  

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'gshd-images',
    metadata: function(req, file, cb) {
      cb(null, {
        fieldName: "Testing Metadata callback"
      });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

module.exports = upload;