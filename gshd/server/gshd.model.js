const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let gshd = new Schema({
  
  gshd_title: {
    type: String
  },
  gshd_location: {
    type: String
  },
  gshd_rating: {
    type: Number
  },
  gshd_image: {
    type: String
  }

});

module.exports = mongoose.model('GSHG', gshd);