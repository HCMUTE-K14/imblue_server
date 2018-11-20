const BaseService = require('./base.service');
const Beverage = require('../model/beverage.model');

const BeverageService = new BaseService(Beverage);

module.exports = BeverageService;