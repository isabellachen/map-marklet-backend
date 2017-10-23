const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markerSchema = new Schema({
  url: String,
  title: String,
  desc: String,
  place: {
    'formatted_address': String,
    'name': String,
  },
  latLng: {
    lat: Number,
    lng: Number,
  },
});

const Marker = mongoose.model('Marker', markerSchema);

module.exports = Marker;
