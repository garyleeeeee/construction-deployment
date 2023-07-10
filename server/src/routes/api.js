const express = require('express');

const usersRouter = require('./users/users.router');
const purchaseRouter = require('./purchaseRequisitions/purchaseRequisitions.router');

const api = express.Router();

api.use('/users', usersRouter);

api.use('/purchase', purchaseRouter);

module.exports = api;