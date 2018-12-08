const BaseService = require('./base.service');
const Category = require('../model/category.model');

const CategoryService = new BaseService(Category);

module.exports = CategoryService;
