const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema to be referenced as gshd_geometry in gshd
let gshd_location = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [],
    index: '2dsphere'
  }
});

// Primary schema
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
  },
  gshd_geometry: gshd_location
});

module.exports = mongoose.model('GSHG', gshd);