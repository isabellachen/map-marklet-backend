const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const Schema = mongoose.Schema;

const editorSchema = new Schema({
  name: String,
  email: String,
  token: String,
  trips: [{type: Schema.Types.ObjectId, ref: 'Trip'}],
});

const Editor = mongoose.model('Editor', editorSchema);

Editor.getEditorTrips = (name) => {
  return Editor
    .findOne({name: name})
    .populate({path: 'trips', select: 'title'});
};

module.exports = Editor;
