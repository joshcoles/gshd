// Use findConfig package to find closest .env in parent directory
const dotenv = require('dotenv');
const findConfig = require('find-config');
dotenv.config({ path: findConfig('.env') });

// Access S3 Class on AWS SDK
const aws = require('aws-sdk');
const s3 = new aws.S3();

// Middleware for handling multipart/form-data
const multer = require('multer');
const multerS3 = require('multer-s3');

// Pass credentials through to AWS before performing any actions
aws.config.update({
  secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
  accessKeyId: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2'
});  

const bucketName = 'gshd-images';
const metaData = 'testKey: testValue';

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    key: function(req, file, cb) {

      const currentDay = new Date();
      const day = currentDay.getDate();
      const month = currentDay.getMonth();
      const year = currentDay.getFullYear();
      const randomInt = Math.floor(Math.random() * 100000000);

      // Pass dynamic name for image based on date for now
      cb(null, `${day}-${month}-${year}-${randomInt}`);
    },
    metadata: function(req, file, cb) {
      cb(null, {
        fieldName: metaData
      });
    }
  })
});

module.exports = upload;