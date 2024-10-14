
require('dotenv').config();

config = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'expensedb',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
  },
  jwtSecret: process.env.JWT_SECRET_KEY,
};

module.exports = config;
