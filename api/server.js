require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const authRouter = require('../auth/auth-router.js')
const usersRouter = require('../users/users-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

server.use('/auth', authRouter);
server.use('/stylists', usersRouter)

server.get('/', (req, res) => {
res.send("Welcome to the API!")
});

module.exports = server;