const Marker = require('../model/marker.model');
const Trip = require('../model/trip.model');

const addMarker = async (ctx, next) => {
  const id = ctx.params.id;
  const trip = await Trip.findOne({_id: id, editor: ctx.user._id});
  const markerData = {
    url: ctx.request.body.url,
    title: ctx.request.body.title,
    desc: ctx.request.body.desc,
    place: ctx.request.body.place,
    latLng: ctx.request.body.latLng,
  };
  const newMarker = await Marker.create(markerData);
  trip.markers.push(newMarker);
  trip.save();
  ctx.status = 201;
  ctx.body = newMarker;
};

const deleteMarker = async (ctx, next) => {
  const id = ctx.params.id;
  const markerId = ctx.params.markerId;
  const editorId = ctx.user._id;
  const trip = await Trip.getTripOfEditor(id, editorId);
  if (!trip) ctx.throw(404);
  for (let i = 0; i < trip.markers.length; i++) {
    if (trip.markers[i]['_id'] == markerId) {
      trip.markers.splice(i, 1);
    }
  }
  trip.save();
  const deletedMarker = await Marker.findByIdAndRemove(markerId);
  ctx.body = deletedMarker;
  ctx.status = 204;
};

module.exports = {
  addMarker,
  deleteMarker,
};
