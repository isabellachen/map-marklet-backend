const Router = require('koa-router');
const router = new Router();

const tripsController = require('./controllers/trips.controller');
const editorController = require('./controllers/editor.controller');
const markersController = require('./controllers/markers.controller');
const Editor = require('./model/editor.model');

const authMiddleware = async (ctx, next) => {
  let token = ctx.headers.authorization;
  if (token) token = token.split(' ')[1];
  if (!token) {
    ctx.status = 401;
    return;
  }
  ctx.user = await Editor.findOne({token});
  if (!ctx.user) {
    ctx.status = 401;
    return;
  }
  await next();
};

//all users
router.get('/trips', tripsController.getAllTrips);
router.get('/trips/:id', tripsController.getTrip);

//editor actions
router.post('/trips', authMiddleware, tripsController.createTrip);
router.put('/trips/:id', authMiddleware, tripsController.editTrip);
router.delete('/trips/:id', authMiddleware, tripsController.deleteTrip);

//editor information
router.post('/sign-up', editorController.signUpEditor);
router.get('/me/trips', authMiddleware, editorController.getEditorTrips);

//editor add and delete markers
router.post('/trips/:id', authMiddleware, markersController.addMarker);
router.delete('/trips/:id/markers/:markerId', authMiddleware, markersController.deleteMarker);

module.exports = router;
