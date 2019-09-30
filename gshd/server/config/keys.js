const dotenv = require('dotenv');
const findConfig = require('find-config');
dotenv.config({ path: findConfig('.env') });

module.exports = {
  mongoURI: `mongodb+srv://${process.env.MONGODB_CLOUD_USERNAME}:${process.env.MONGODB_CLOUD_PASSWORD}@gshd-mxrpx.mongodb.net/gshd-db?retryWrites=true&w=majority`,
  secretOrKey: `${process.env.JWT_OPTIONS_SECRET}`
};