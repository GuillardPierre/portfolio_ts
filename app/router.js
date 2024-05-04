const express = require('express');
const router = express.Router();
const mongooseConnection = require('./middlewares/handleMongoDb');

const homeController = require('./controller/homeController');
const projectController = require('./controller/projectController');
const authcontroller = require('./controller/authController');
router.use(mongooseConnection.mgConnect);
router.get('/', homeController.index);

router.get('/signup', authcontroller.signupPage);
router.post('/api/user', authcontroller.signup);
// TODO router.get('/api/user', authcontroller.login )

router.get('/project/snake', projectController.snake);
router.get('/project/meteoApi', projectController.meteo);
router.get('/project/pokemonApi', projectController.pokemon);
router.get('/project/departementKing', projectController.department);
router.get('/project/pendu', projectController.pendu);
router.get('/project/pierreFeuilleCiseaux', projectController.pfc);
// ! A ajouter après la connexion.
// router.get(
// 	'/project/chat',
// 	mongooseConnection.mgConnect,
// 	projectController.chat
// );

module.exports = router;
