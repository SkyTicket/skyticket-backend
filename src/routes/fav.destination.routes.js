const express = require('express');
const favDestinationController = require('../controllers/favorite/fav.destination.controller');
const router = express.Router();

router.get('/favorite-destination', (req, res) => favDestinationController.favDestination(req, res));

module.exports = router;