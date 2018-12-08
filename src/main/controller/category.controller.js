const CategoryService = require('../service/category.service');
const HttpUtils = require('../common/http.utils');
const SimpleController = require('./simple.controller')(CategoryService);

const CategoryController = {};

CategoryController.create = (req, res) => {
    let order = req.body;

    SimpleController.create(order, (data) => {
            res.status(200).json({ success: true, result: data });
        },
        (err) => {
            res.status(500).json({ success: false, err: err.message })
        });
}

CategoryController.update = (req, res) => {
    let payload = { id: req.params.categoryId, body: req.body };

    SimpleController.update(payload, (data) => {
            res.status(200).json({ success: true, result: data });
        },
        (err) => {
            res.status(500).json({ success: false, err: err.message })
        });
}

CategoryController.delete = (req, res) => {
    let payload = { id: req.params.orderId };

    SimpleController.delete(payload, (data) => {
            res.status(200).json({ success: true });
        },
        (err) => {
            res.status(500).json({ success: false, err: err.message })
        });
}

CategoryController.bulkDelete = (req, res) => {
    let ids = req.query.id.split(',');

    SimpleController.bulkDelete(ids, (data) => {
            res.status(200).json({ success: true });
        },
        (err) => {
            res.status(500).json({ success: false, err: err.message })
        });
}

CategoryController.list = (req, res) => {
    let pagingInfo = HttpUtils.getPagingInfoFromRequest(req);

    SimpleController.list(pagingInfo, (data) => {
      res.status(200).json({ success: true, result: data });
    }, (err) => {
      res.status(500).json({ success: false, err: err.message })
    })
}

CategoryController.findById = (req, res) => {
    let id = req.params.categoryId;

    SimpleController.findById(id)
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

module.exports = CategoryController;
