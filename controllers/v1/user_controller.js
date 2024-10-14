const bcrypt = require("bcryptjs");
const config = require("../../config/config.js");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user.js");

//@desc CREATE user
//@route POST /v1/users
//@access public
const createUserHandler = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    name = name.toLowerCase();
    email = email.toLowerCase();
    password = password.toLowerCase();

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({ message: "invalid type" });
    }

    //console.log(name, email, password)
    if (password.length < 8) {
      return res.status(400).json({
        message:
          "invalid password length, password should not be less than 8 charcters",
      });
    }

    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      console.warn("User with this email already exists", { email: email });
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    //console.log(name, email, password)
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    console.log(user.name, user.email, user.password);
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    console.log(user.name, user.email, user.password);
    return;
  } catch (error) {
    res.status(500).json({ message: "invalid input", error });
  }
};

//@desc RETRIEVE user
//@route GET /v1/users/:id
//@access public
const getUserHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({ message: "id must be a string" });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

//@desc LOGGIN user
//@route POST /v1/users/:id
//@access public

const logInUserHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        message: "invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "invalid password" });
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" });

    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  3}
};

module.exports = {
  createUserHandler,
  getUserHandler,
  logInUserHandler,
};
