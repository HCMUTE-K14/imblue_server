const BaseService = require('./base.service');
const Beverage = require('../model/beverage.model');

const BeverageService = new BaseService(Beverage);

BeverageService.list = (limit, page) => {
    return new Promise((resolve, reject) => {
        Beverage.find()
            .populate('category')
            .limit(parseInt(limit))
            .skip(limit * page)
            .exec(function(err, beverages) {
                if (err) {
                    reject(err);
                } else {
                    resolve(beverages);
                }
            })
    });
}

BeverageService.findBeverageByCategoryId = (categoryId, limit, page) => {
    return new Promise((resolve, reject) => {
        Beverage.find({category: categoryId})
            .populate('category')
            .limit(parseInt(limit))
            .skip(limit * page)
            .exec(function(err, beverages) {
                if (err) {
                    reject(err);
                } else {
                    resolve(beverages);
                }
            })
    });
}


module.exports = BeverageService;
