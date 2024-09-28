const express = require('express');
const route = express.Router();
const { healthCheckHandler } = require('../../controllers/sharedcontroller')

route.get('/health', healthCheckHandler);

module.exports = route;