const UserService = require('../service/user.service');
const Log = require('../log')('AuthPerrmissionMiddleware');

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
    let userId = req.jwt.userId;
    if (req.params && req.params.userId && userId === req.params.userId) {
        return next();
    } else {
        return adminCanAccess(req, res, next);
    }
};


exports.onlyAdminCanDoThisAction = (req, res, next) => {
    Log.info('Access onlyAdminCanDoThisAction');
    return adminCanAccess(req, res, next);
};

exports.sameUserCanDoThisAction = (req, res, next) => {
    Log.info('Access sameUserCanDoThisAction');
    let userId = req.jwt.userId;

    if (req.params.userId !== userId) {
        Log.info('sameUserCanDoThisAction success');
        return next();
    } else {
        Log.info('sameUserCanDoThisAction fail');
        return res.status(401).json({ success: false, message: 'Unauthozied' });
    }
};

function adminCanAccess(req, res, next) {
    let userId = req.jwt.userId;
    UserService.isAdmin(userId)
        .then(result => {
            if (result && result == true) {
                Log.info('adminCanAccess success');
                next();
            } else {
                Log.info('adminCanAccess fail');
                return res.status(401).json({ success: false, message: 'Unauthozied' });
            }
        })
        .catch(err => {
            Log.error('adminCanAccess fail ' + err.message);
            return res.status(401).json({ success: false, message: 'Unauthozied' });
        })
}