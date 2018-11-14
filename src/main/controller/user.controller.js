const UserService = require('../service/user.service');
const BCrypt = require('bcryptjs');
const Buffer = require('buffer').Buffer;
const Log = require('../log')('UserController');

const UserController = {};

UserController.registration = (req, res) => {
	let hashedPasswordBase64;
	if(req.body.password) {
		 hashedPasswordBase64 = hashPasswordBase64(req.body.password);
	} else {
		res.status(503).json({ success: false, message: 'Bad request' });
	}
	req.body.password = hashedPasswordBase64;

 	UserService.save(req.body)
        .then(data => { 
        	Log.debug('Account was created ' + data._id);
        	res.status(200).json({  success: true, id: data._id });
    	})
        .catch(err => { 
        	Log.debug(err.message);
        	if (err.code == 11000) {
                return res.status(503).send({ success: true, message: 'User already exists' });
            }
        	res.status(500).json({ success: false, error: err.message }); 
    	});
}

UserController.update = (req, res) => {

	if (req.body.password){
       let hashedPasswordBase64 = hashPasswordBase64(req.body.password);
       req.body.password = hashedPasswordBase64;
   }

   UserService.patchUser(req.params.userId, req.body)
		.then(result => {
		    res.status(200).send({ success: true, message: 'Updated' });
		})
		.catch(err => {
		   res.status(500).json({ success: false, error: err.message });
		})
}


function hashPassword(password) {
	let salt = BCrypt.genSaltSync(10);
	return BCrypt.hashSync(password, salt);
}
function hashPasswordBase64(password) {
	let hashedPassword = hashPassword(password);

	return Buffer.from(hashedPassword).toString('base64');
}


module.exports = UserController;