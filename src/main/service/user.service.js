const User = require('../model/user.model');

exports.patchUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        User.findById(id, function (err, user) {
            if (err) {
                reject(err);
            };
            for (let i in userData) {
                user[i] = userData[i];
            }
            user.save(function (err, updatedUser) {
                if (err) {
                    return reject(err);
                }
                resolve(updatedUser);
            });
        });
    })
};

exports.save = (userData) => {
	let user = new User(userData);
	return user.save();
}