const Express = require('express');

const HealthRouter = require('./health.route');
const UserRouter = require('./user.route');
const AuthRouter = require('./auth.route');
const TokenRouter = require('./token.route');

const BeverageRouter = require('./beverage.route');
const OrderRouter = require('./order.route');

const Root = Express.Router();

Root.use('/health-check', HealthRouter); 
Root.use('/users', UserRouter);
Root.use('/auth', AuthRouter);
Root.use('/token', TokenRouter);
Root.use('/beverages', BeverageRouter);
Root.use('/orders', OrderRouter);

module.exports = Root;