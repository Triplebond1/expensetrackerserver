const express = require("express");
const router = express.Router();
const {
  createUserHandler,
  getUserHandler,
  logInUserHandler,
} = require("../../controllers/v1/user_controller");
const {validateToken} = require('../../middlewares/auth')

router.post("", createUserHandler);

router.get("/:id", validateToken, getUserHandler);

router.post("/login", logInUserHandler );


module.exports = router;
