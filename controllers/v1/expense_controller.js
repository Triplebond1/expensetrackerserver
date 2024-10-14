const { Category } = require("../../models/category");
const { Expense } = require("../../models/expense");
const { Op } = require("sequelize");

//@desc Create Expense
//@route POST /v1/Expense
//@access private

const createExpenseHandler = async (req, res) => {
  try {
    const user = req.user; //the user created and manage by our middleware session
    const { amount, naration, categoryId } = req.body;

    if (typeof amount !== "number") {
      res.status(400).json({ message: "amount must be a number" });
    }

    if (typeof naration !== "string") {
      res.status(400).json({ message: "naration must be a string" });
    }

    if (typeof categoryId !== "string") {
      res.status(400).json({ message: "categoryId must be a string" });
    }

    const category = await Category.findByPk(categoryId);

    if (!category) {
      res.status(400).json({ message: "category does not exist" });
    }

    const expense = await Expense.create({
      amount,
      naration,
    });

    expense.setUser(user);
    expense.setCategory(category);

    return res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

//@desc RETRIEVE Expense
//@route GET ALL /v1/Expense
//@access private

const getAllExpenseHandler = async (req, res) => {
  try {
    const user = req.user;

    let { filter, startDate, endDate } = req.query;

    if (filter) {
      if (typeof filter !== "string") {
        return res.status(400).json({ message: "filter must be a string" });
      }

      const category = await Category.findOne({
        where: {
          name: filter,
        },
      });

      if (!category) {
        return res.status(400).json({ message: "category not found" });
      }

      const expenses = await Expense.findAll({
        where: {
          userId: user.id,
          CategoryId: category.id,
        },
      });

      return res.status(200).json(expenses);
    }


    if (startDate && endDate) {
      startDate = new Date(startDate);
      endDate = new Date(endDate);
      //add an extra date to enddate because for the bug in date stuff
      endDate.setDate(endDate.getDate() + 1)

      const expenses = await Expense.findAll({
        where: {
          createdAt: {
            [Op.between]: { startDate, endDate },
          },
        },
      });

      return res.status(201).json(expenses);
    }
    //fetch all user expenses
    const expenses = await Expense.findAll({
      where: {
        userId: user.id,
      },
    });

    res.status(201).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

//@desc RETRIEVE Expense
//@route GET /v1/Expense/:id
//@access private

const getAExpenseHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Id must be a string",
      });
    }

    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(400).json({
        message: "Expense not found",
      });
    }

    return res.status(400).json(expense);
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

//@desc UPDATE Expense
//@route PUT /v1/Expense/:id
//@access private

const updateExpenseHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, naration, categoryId } = req.body;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Id must be a string",
      });
    }

    if (typeof amount !== "number") {
      res.status(400).json({ message: "amount must be a number" });
    }

    if (typeof naration !== "string") {
      res.status(400).json({ message: "naration must be a string" });
    }

    if (typeof categoryId !== "string") {
      res.status(400).json({ message: "categoryId must be a string" });
    }

    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(400).json({
        message: "Expense not found",
      });
    }

    //update expense
    expense.amount = amount;
    expense.naration = naration;

    const updatedExpense = await expense.save;

    expense.setCategory(category);

    return res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

//@desc DELETE Expense
//@route DELETE /v1/Expense/:id
//@access private

const deleteExpenseHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Id must be a string",
      });
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(400).json({
        message: "Expense not found",
      });
    }

    expense.destroy();

    return res.status(200).json({
      message: `deleted this ${expense}`,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

module.exports = {
  createExpenseHandler,
  updateExpenseHandler,
  getAExpenseHandler,
  getAllExpenseHandler,
  deleteExpenseHandler,
};
