const express = require("express");
const {
  createCategoryHandler,
  getAllCategoryHandler,
  getCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} = require("../../controllers/v1/category_controller");

const { validateToken } = require('../../middlewares/auth')
const router = express.Router();

router.post('', validateToken, createCategoryHandler);
router.get('/:id', getCategoryHandler);
router.get('', getAllCategoryHandler);
router.put('/:id', validateToken, updateCategoryHandler);
router.delete('/:id', validateToken, deleteCategoryHandler);


module.exports = router