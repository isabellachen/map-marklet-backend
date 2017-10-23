const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/map-marklet-backend', {useMongoClient: true});
mongoose.connection.on('connected', () => {
  //eslint-disable-next-line
  console.log('Mongoose connected');
});
