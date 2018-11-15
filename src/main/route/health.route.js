const Express = require('express');
const DB = require('../db');

const HealthRouter = Express.Router();

HealthRouter.route('/')
    .get(checkHealthDatabase);


function checkHealthDatabase(req, res) {
    let dbHealth = DB.healthCheck();
    res.status(200).json({ database: dbHealth == 0 ? 'At risk' : 'OK' });
}

module.exports = HealthRouter;