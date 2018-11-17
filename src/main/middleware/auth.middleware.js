const UserVO = require('../vo/user.vo');
const UserService = require('../service/user.service');
const Log = require('../log')('AuthMiddleware');

exports.isValidRequest = (req, res, next) => {
    Log.info('Access isValidRequest');

    let errors = [];

    if (req.body) {
        if (!req.body.username || !req.body.password) {
            errors.push('Missing username or password field');
        }

        if (errors.length) {
            Log.info('isValidRequest failed');

            return res.status(400).json({ success: false, errors: errors.join(',') });
        } else {
            Log.info('isValidRequest success');

            return next();
        }
    } else {
        Log.info('isValidRequest failed');

        return res.status(400).json({ success: false, errors: 'Missing username or password field' });
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    Log.info('Access isPasswordAndUserMatch');
    let userVO = new UserVO(req.body.username, req.body.password);
    UserService.isPasswordAndUserMatch(userVO)
        .then(user => {
            Log.info('isPasswordAndUserMatch success userId' + user.id);
            req.body = {
                userId: user.id,
                displayName: user.display_name
            };
            return next();
        })
        .catch(err => {
            Log.error('isPasswordAndUserMatch failed ' + err.message);
            return res.status(400).json({ success: false, errors: 'Wrong password' });
        })
};