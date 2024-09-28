const express = require('express');

const cors = require('cors')

const app = express();

const dotenv = require('dotenv');

const sharedRouter = require ('../route/v1/sharedroute')
//load the envirinmental variable from the .env file
dotenv.config()

const PORT = process.env.PORT || 8080;

// to restrict access to api for just a specifi website and you can also 
//specify what kind of operation they are allowed to use on the api
//middle wares
const corsOptions = {
  origin: 'https://inventnexus.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}
app.use(cors(corsOptions));

// use these format if you want anyone to access your api
app.use(cors());
app.use(express.json());
app.use('/v1/shared', sharedRouter);


module.exports = app