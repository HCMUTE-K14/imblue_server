const Express = require('express');
const DB = require('../db');

const UserRouter = require('./user.route');

const Root = Express.Router();

Root.get('/health-check', (req, res) => {
		let dbHealth = DB.healthCheck();
		res.send({database: dbHealth == 0 ? 'At risk': 'OK'});
	}
);

Root.use('/users', UserRouter);

module.exports = Root;