const BaseService = require('./base.service');
const Order = require('../model/order.model');

const OrderService = new BaseService(Order);

OrderService.findOrderWithMenuById = (menuId) => {
    return new Promise((resolve, reject) => {
        Order.find()
            .populate('user_created', { _id: 1, username: 0, display_name: 1, role: 0 })
            .populate('list_menu_item', { _id: 0 })
            .populate('list_menu_item.beverage', { name: 1, price: 1, _id: 0 })
            .exec(function(error, order) {
                if (error) {
                    reject(error);
                } else {
                    let total = calculateTotalPrice(order.list_menu_item);
                    let realData = order.toJSON();
                    realData['totalPrice'] = total;
                    
                    resolve(realData);
                }
            });
    });
};

OrderService.findOrderWithMenu = (limit, page) => {
    return new Promise((resolve, reject) => {
        Order.find()
            .populate('user_created', { role: 0 })
            .populate('list_menu_item', { _id: 0 })
            .populate('list_menu_item.beverage', { name: 1, price: 1, _id: 0 })
            .limit(parseInt(limit))
            .skip(limit * page)
            .exec(function(err, orders) {
                if (err) {
                    reject(err);
                } else {
                    let result = [];
                    for (let order of orders) {
                        total = calculateTotalPrice(order.list_menu_item);
                        let realData = order.toJSON();
                        realData['totalPrice'] = total;
                        result.push(realData);
                    }
                    resolve(result);
                }
            })
    });
}

function calculateTotalPrice(listMenu) {
    let total = 0;

    if (listMenu) {
        for (let i = 0, size = listMenu.length; i < size; i++) {
            let item = listMenu[i];
            if (item && item.beverage && item.beverage.price) {
                let price = item.beverage.price;
                total += item.quantity * price;
            }
        }
    }

    return total;
}

module.exports = OrderService;