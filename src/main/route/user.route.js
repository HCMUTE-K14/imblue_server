const Express = require('express');
const UserController = require('../controller/user.controller');

const UserRouter = Express.Router();

UserRouter.route('/registration')
    .post(UserController.registration);

UserRouter.route('/:userId')
    .patch(UserController.update);

module.exports = UserRouter;