const express = require("express");
const route = express.Router();
const { healthCheckHandler } = require("../../controllers/v1/sharedcontroller");

route.get("/health", healthCheckHandler);


module.exports = route;
