const express = require('express');
const router = express.Router();

const homeController = require('./controller/homeController');
const projectController = require('./controller/projectController');
const authcontroller = require('./controller/authController');
const scoreController = require('./controller/scoreController');

router.get('/', homeController.index);
router.get('/project/snake', projectController.snake);
router.get('/project/meteoApi', projectController.meteo);
router.get('/project/pokemonApi', projectController.pokemon);
router.get('/project/departementKing', projectController.department);
router.get('/project/pendu', projectController.pendu);
router.get('/project/pierreFeuilleCiseaux', projectController.pfc);

router.get('/scores', authcontroller.beta);
router.get('/login', authcontroller.beta);

module.exports = router;
