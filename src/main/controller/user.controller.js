const UserService = require('../service/user.service');
const HashUtils = require('../common/hash.utils');
const Log = require('../log')('UserController');

const UserController = {};

UserController.create = (req, res) => {
    //1. Hash password from payload
    let password = req.body.password;
    req.body.password = HashUtils.hashBcryptBase64(password);

    //2. Insert into database with hash password
    /// set default role is NORMAL_USER
    /// to set role Admin, just edit database =)) with role = 'ADMIN'
    req.body.role = 'NORMAL_USER';
    UserService.create(req.body)
        .then(data => {
            Log.info('Account was created with id: ' + data._id);
            res.status(200).json({ success: true, id: data });
        })
        .catch(err => {
            Log.error(err.message);
            if (err.code == 11000) {
                return res.status(201).json({ success: true, message: 'Account already exists' });
            }
            res.status(500).json({ success: false, error: err.message });
        });
}

UserController.update = (req, res) => {
    //1. Check if payload had password ==> hash it
    if (req.body.password) {
        let hashedPasswordBase64 = HashUtils.hashBcryptBase64(req.body.password);
        req.body.password = hashedPasswordBase64;
    }
    delete req.body.role;
    //2. Update data
    UserService.update(req.params.userId, req.body)
        .then(result => {
            Log.info('Account was updated with id: ' + ids);
            res.status(200).json({ success: true, message: 'Account was updated' });
        })
        .catch(err => {
            Log.error(err.message);
            res.status(500).json({ success: false, error: err.message });
        })
}

UserController.delete = (req, res) => {
    //1. Get ids from query param and parse it into javascript array object
    // /rest/users?id=1,2,3 ==> ids = [1, 2, 3]
    let ids = req.query.id.split(',');

    //2. Remove it
    UserService.removeByIds(ids)
        .then(result => {
            Log.info('Bulk Account was deleted with id: ' + ids);
            res.status(200).json({ success: true, message: 'Bulk Account deleted' })
        })
        .catch(err => {
            Log.error(err.message);
            res.status(500).json({ success: false, error: err.message });
        })
}

UserController.deleteById = (req, res) => {
    let id = req.params.userId;
    UserService.removeById(id)
        .then(result => {
            Log.info('Account was deleted with id: ' + id);
            res.status(200).json({ success: true, message: 'Account deleted' })
        })
        .catch(err => {
            Log.error(err.message);
            res.status(500).json({ success: false, error: err.message });
        })
}

UserController.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    UserService.list(limit, page)
        .then((result) => {
            Log.info('Get list user with limit=' + limit + ' page=' + page);
            res.status(200).json({ success: true, result: result });
        })
        .catch(err => {
            Log.error(err.message);
            res.status(500).json({ success: false, error: err.message });
        })
}

module.exports = UserController;