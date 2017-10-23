const Trip = require('../model/trip.model');
const Editor = require('../model/editor.model');

const getAllTrips = async (ctx, next) => {
  const trips = await Trip.getAllTrips();
  ctx.body = trips;
  ctx.status = 200;
};

const createTrip = async (ctx, next) => {
  const tripData = {
    title: ctx.request.body.title,
    editor: ctx.user,
    latLng: ctx.request.body.latLng,
    zoom: ctx.request.body.zoom,
    markers: [],
  };
  const newTrip = await Trip.create(tripData);
  ctx.user.trips.push(newTrip);
  ctx.user.save();
  ctx.body = newTrip;
  ctx.status = 200;
};

const getTrip = async (ctx, next) => {
  const id = ctx.params.id;
  const trip = await Trip.getTrip(id);
  ctx.body = trip;
  ctx.status = 200;
};

const editTrip = async (ctx, next) => {
  //edit title of trip
  const id = ctx.params.id;
  const data = ctx.request.body;
  const trip = await Trip.findOne({_id: id});
  if (!trip) ctx.throw(404);
  if (data.title) trip.title = data.title;
  ctx.body = await trip.save();
};

const deleteTrip = async (ctx, next) => {
  const id = ctx.params.id;
  const trip = await Trip.findOne({_id: id});
  if (!trip) ctx.throw(404);
  const deletedTrip = await Trip.findByIdAndRemove(id);
  ctx.body = deletedTrip;
};

module.exports = {
  getAllTrips,
  createTrip,
  getTrip,
  editTrip,
  deleteTrip,
};
