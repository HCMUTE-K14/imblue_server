const User = require('../model/user.model');
const BaseService = require('./base.service');

const UserService = new BaseService(User);

module.exports = UserService;

