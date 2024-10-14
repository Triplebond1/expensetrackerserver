const { Category } = require("../../models/category");

//@desc Create Category
//@route POST /v1/categories
//@access private

const createCategoryHandler = async (req, res) => {
  try {
    const { name } = req.body;

    if (typeof name !== "string") {
      return res.status(400).json({ message: "name must be string" });
    }

    const existingCategory = await Category.findOne({
      where: { name },
    });

    if (existingCategory) {
      res.status(400).json({message: 'category already exist'})
    }
    const category = await Category.create({ name });

    return res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

//@desc RETRIEVE all Category
//@route GET /v1/categories/:id
//@access public
const getAllCategoryHandler = async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.status(201).json(categories);
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

//@desc RETRIEVE a Category
//@route GET /v1/categories/:id
//@access public
const getCategoryHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "id must be a string",
      });
    }

    const category = await Category.findByPk(id);

    if (category === null) {
      return res.status(201).json({
        message: "category not found",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

//@desc UPDATE a Category
//@route PUT /v1/categories/:id
//@access private
const updateCategoryHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (typeof name !== "string") {
      return res.status(400).json({ message: "name must be string" });
    }

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "id must be a string",
      });
    }

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(400).json({
        message: "category not found",
      });
    }

    //update category
    category.name = name;
    await category.save();

    return res.status(201).json(category.name);
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

//@desc DELETE a Category
//@route DELETE /v1/categories/:id
//@access private
const deleteCategoryHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({ message: "id must be a string" });
    }

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }

    await category.destroy();
    res.status(204).json();
    return;
  } catch (error) {
    return res.status(500).json({ message: "internal server error", error });
  }
};

module.exports = {
  createCategoryHandler,
  getAllCategoryHandler,
  getCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
};
