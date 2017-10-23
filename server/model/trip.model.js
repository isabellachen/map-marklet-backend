const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  title: String,
  editor: {type: Schema.Types.ObjectId, ref: 'Editor'},
  latLng: {
    lat: Number,
    lng: Number,
  },
  zoom: Number,
  markers: [{type: Schema.Types.ObjectId, ref: 'Marker'}],
});

const Trip = mongoose.model('Trip', tripSchema);

Trip.getAllTrips = () => {
  return Trip
    .find()
    .populate({path: 'editor', select: 'name email'})
    .select('title editor');
};

Trip.createTrip = (newTrip) => {
  return newTrip.save();
};

Trip.getTrip = (id) => {
  return Trip
    .findOne({_id : id})
    .populate({path: 'editor', select: 'name email'})
    .populate('markers');
};

Trip.getTripOfEditor = (id, editorId) => {
  return Trip
    .findOne({_id : id, editor: editorId})
    .populate('markers');
};


module.exports = Trip;
