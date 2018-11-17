const JWT = require('jsonwebtoken');

const Config = require('../config');
const Log = require('../log')('ValidTokenMiddleware');

exports.validJWT = (req, res, next) => {
    Log.info('Access validJWTNeeded');
    if (req.headers.authorization) {
        try {

            let authorization = req.headers.authorization.split(' ');
            if (authorization[0] !== 'Bearer') {
                Log.info('Bearer not found');
                return res.status(401).json({ success: false, messsage: 'Certificate not found' });
            } else {
                req.jwt = JWT.verify(authorization[1], Config.jwt_secret);
                Log.info('Verify successfully');

                return next();
            }
        } catch (err) {
            Log.error('Verify failed ' + err.message);
            return res.status(403).json({ success: false, message: 'Wrong Certificate' });
        }
    } else {
        Log.info('Header Authorization not found');

        return res.status(401).json({ success: false, messsage: 'Certificate not found' });
    }
};