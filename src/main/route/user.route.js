const Express = require('express');
const UserController = require('../controller/user.controller');

const UserRouter = Express.Router();

UserRouter.route('/registration')
    .post(UserController.create);

UserRouter.route('/:userId')
    .patch(UserController.update)
    .delete(UserController.deleteById);

UserRouter.route('/')
	.delete(UserController.delete);

module.exports = UserRouter;