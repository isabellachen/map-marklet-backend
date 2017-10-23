const Editor = require('../model/editor.model');

const signUpEditor = async (ctx, next) => {
  const editorData = {
    name: ctx.request.body.name,
    email: ctx.request.body.email,
    token: ctx.request.body.token,
    trips: [],
  };

  const newEditor = new Editor(editorData);
  const editor =  await newEditor.save();
  ctx.body = editor;
  ctx.status = 200;
};

const getEditorTrips = async (ctx, next) => {
  const name = ctx.user.name;
  const editor = await Editor.getEditorTrips(name);
  ctx.body = editor.trips;
};


module.exports = {
  signUpEditor,
  getEditorTrips,
};
