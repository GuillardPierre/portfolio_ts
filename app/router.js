const express = require('express');
const router = express.Router();
const mongooseConnection = require('./middlewares/handleMongoDb');
const loadUser = require('./middlewares/loadUser');

const homeController = require('./controller/homeController');
const projectController = require('./controller/projectController');
const authcontroller = require('./controller/authController');
const messageController = require('./controller/messageController');

const { catchErrors, errorHandler } = require('./middlewares/tryCatch');

router.use(mongooseConnection.mgConnect);
router.use(loadUser);

router.get('/', homeController.index);

router.get('/signup', authcontroller.signupPage);
router.post('/api/signup', catchErrors(authcontroller.signup));
router.post('/api/login', catchErrors(authcontroller.login));
router.get('/deconnexion', authcontroller.logout);

router.get('/account', authcontroller.showAccount);

router.get('/project/snake', projectController.snake);
router.get('/project/meteoApi', projectController.meteo);
router.get('/project/pokemonApi', projectController.pokemon);
router.get('/project/departementKing', projectController.department);
router.get('/project/pendu', projectController.pendu);
router.get('/project/pierreFeuilleCiseaux', projectController.pfc);

router.get('/project/chat', projectController.chat);
router.post('/api/message', catchErrors(messageController.save));
// ! Ajouter un mw de vérification d'utilisateur connecté en session.
router.get('/api/message', catchErrors(messageController.display));

router.use(errorHandler);

module.exports = router;
