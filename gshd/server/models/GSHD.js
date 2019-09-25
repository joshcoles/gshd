const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema to be referenced as gshd_geometry in gshd
let LocationSchema = new Schema({
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
let GSHDSchema = new Schema({
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
  gshd_date: {
    type: Date
  },
  gshd_geometry: LocationSchema
});

module.exports = mongoose.model('GSHD', GSHDSchema);