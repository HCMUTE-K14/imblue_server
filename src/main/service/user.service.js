const HashUtils = require('../common/hash.utils');
const User = require('../model/user.model');
const BaseService = require('./base.service');

const UserService = new BaseService(User);

UserService.findUserByUsername = findUserByUsername;

UserService.isPasswordAndUserMatch = isPasswordAndUserMatch;

UserService.isAdmin = isAdmin;

function isAdmin(userId) {
    return new Promise((resolve, reject) => {
        UserService.findById(userId)
            .then(user => {
                resolve('ADMIN' === user.role);
            })
            .catch(err => {
                reject(err);
            })
    });
}

function isPasswordAndUserMatch(userVO) {
    return new Promise((resolve, reject) => {
        findUserByUsername(userVO.username)
            .then(user => {
                let isMatchPassword = HashUtils.comparePassword(userVO.password, user.password);
                if (isMatchPassword) {
                    resolve(user);
                } else {
                    reject(new Error('Wrong password'));
                }
            })
            .catch(err => {
                reject(err);
            })
    });
}

function findUserByUsername(username) {
    return User.findOne({ username: username });
}

module.exports = UserService;