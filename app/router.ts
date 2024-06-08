import express from 'express';
import mongooseConnection from './middlewares/handleMongoDb';
import loadUser from './middlewares/loadUser';

const router = express.Router();

import homeController from './controller/homeController';
import projectController from './controller/projectController';
import authController from './controller/authController';
import messageController from './controller/messageController';

import { catchErrors, errorHandler } from './middlewares/tryCatch';
import { castObject } from './models/mongoDb/Message';

router.use(loadUser);
router.use(mongooseConnection.mgConnect);

router.get('/', homeController.index);

router.get('/signup', authController.signupPage);
router.post('/api/signup', catchErrors(authController.signup));
router.post('/api/login', catchErrors(authController.login));
router.get('/deconnexion', authController.logout);
router.get('/getUser', catchErrors(authController.accountInformation));

router.get('/account', authController.showAccount);

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

export default router;
