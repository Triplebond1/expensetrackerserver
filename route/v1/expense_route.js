const express = require("express");
const {
  createExpenseHandler,
  updateExpenseHandler,
  getAExpenseHandler,
  getAllExpenseHandler,
  deleteExpenseHandler,
} = require("../../controllers/v1/expense_controller");

const { validateToken } = require("../../middlewares/auth");
const router = express.Router();

router.post("", validateToken, createExpenseHandler);

router.get("/:id", validateToken, getAExpenseHandler);

router.get("", validateToken, getAllExpenseHandler);

router.put("/:id", validateToken, updateExpenseHandler);

router.delete("/:id", validateToken, deleteExpenseHandler);

module.exports = router;
