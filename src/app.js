const express = require("express");

const cors = require("cors");

const app = express();

const dotenv = require("dotenv");

const userRoutes = require("../route/v1/user_route.js");

const categoryRoutes = require("../route/v1/category_route.js");

const expenseRoutes = require("../route/v1/expense_route.js")

//load the envirinmental variable from the .env file
dotenv.config();

const PORT = process.env.PORT || 8080;

// to restrict access to api for just a specific website and you can also
//specify what kind of operation they are allowed to use on the api
//middle wares
// const corsOptions = {
//   origin: "https://inventnexus.com",
//   methods: ["GET", "POST", "PUT", "DELETE"],
// };
//app.use(cors(corsOptions));

// use these format if you want anyone to access your api
app.use(cors());
app.use(express.json());

//routes
app.use("/v1/users", userRoutes);
app.use("/v1/categories", categoryRoutes)
app.use("/v1/expense", expenseRoutes)

module.exports = app;
