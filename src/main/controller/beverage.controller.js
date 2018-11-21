const BeverageService = require('../service/beverage.service');
const HttpUtils = require('../common/http.utils');
const SimpleController = require('./simple.controller')(BeverageService);

const BeverageController = {};

BeverageController.create = (req, res) => {
    let beverage = req.body;

    SimpleController.create(beverage, (data) => {
            res.status(200).json({ success: true, result: data });
        },
        (err) => {
            res.status(500).json({ success: false, err: err.mmessage })
        });
}

BeverageController.update = (req, res) => {
    let payload = { id: req.params.beverageId, body: req.body };

    SimpleController.update(payload, (data) => {
            res.status(200).json({ success: true, result: data });
        },
        (err) => {
            res.status(500).json({ success: false, err: err.message })
        });
}

BeverageController.delete = (req, res) => {
    let payload = req.params.beverageId;

    SimpleController.delete(payload, (data) => {
            res.status(200).json({ success: true });
        },
        (err) => {
            res.status(500).json({ success: false, err: err.message })
        });
}

BeverageController.bulkDelete = (req, res) => {
    let ids = req.query.id.split(',');

    SimpleController.bulkDelete(ids, (data) => {
            res.status(200).json({ success: true });
        },
        (err) => {
            res.status(500).json({ success: false, err: err.message })
        });
}

BeverageController.list = (req, res) => {
    let pagingInfo = HttpUtils.getPagingInfoFromRequest(req);
    SimpleController.list(pagingInfo, (data) => {
            res.status(200).json({ success: true, result: data });
        },
        (err) => {
            res.status(500).json({ success: false, err: err.message })
        });
}

BeverageController.findById = (req, res) => {
    let id = req.params.beverageId;
    SimpleController.findById(id, (data) => {
            if (data) {
                res.status(200).json({ success: true, result: data });
            } else {
                res.status(200).json({ success: false });
            }
        },
        (err) => {
            res.status(500).json({ success: false, err: err.message })
        });
}

module.exports = BeverageController;