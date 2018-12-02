const OrderService = require('../service/order.service');
const HttpUtils = require('../common/http.utils');
const SimpleController = require('./simple.controller')(OrderService);

const OrderController = {};

OrderController.create = (req, res) => {
    let order = req.body;

    SimpleController.create(order, (data) => {
            res.status(200).json({ success: true, result: data });
        },
        (err) => {
            res.status(500).json({ success: false, err: err.message })
        });
}

OrderController.update = (req, res) => {
    let payload = { id: req.params.orderId, body: req.body };

    SimpleController.update(payload, (data) => {
            res.status(200).json({ success: true, result: data });
        },
        (err) => {
            res.status(500).json({ success: false, err: err.message })
        });
}

OrderController.delete = (req, res) => {
    let payload = { id: req.params.orderId };

    SimpleController.delete(payload, (data) => {
            res.status(200).json({ success: true });
        },
        (err) => {
            res.status(500).json({ success: false, err: err.message })
        });
}

OrderController.bulkDelete = (req, res) => {
    let ids = req.query.id.split(',');

    SimpleController.bulkDelete(ids, (data) => {
            res.status(200).json({ success: true });
        },
        (err) => {
            res.status(500).json({ success: false, err: err.message })
        });
}

OrderController.list = (req, res) => {
    let pagingInfo = HttpUtils.getPagingInfoFromRequest(req);

    OrderService.findOrderWithMenu(pagingInfo)
        .then(data => {
            res.status(200).json({ success: true, result: data });
        })
        .catch(err => {
            res.status(500).json({ success: false, err: err.message })
        })
}

OrderController.findById = (req, res) => {
    let id = req.params.orderId;
    OrderService.findOrderWithMenuById(id)
        .then(data => {
            if (data) {
                res.status(200).json({ success: true, result: data });
            } else {
                res.status(200).json({ success: false });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, err: err.message })
        });
}

module.exports = OrderController;