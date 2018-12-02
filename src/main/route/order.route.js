const Express = require('express');
const OrderController = require('../controller/order.controller');
const VerifyTokenMiddleware = require('../middleware/verify-token.middleware');
const PermissionMiddleware = require('../middleware/auth-permission.middleware');

const OrderRouter = Express.Router();

OrderRouter.route('/')
    .get(VerifyTokenMiddleware.validJWT, OrderController.list)
    .post(VerifyTokenMiddleware.validJWT, OrderController.create)
    .delete(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlyAdminCanDoThisAction, OrderController.bulkDelete);

OrderRouter.route('/:orderId')
	.get(VerifyTokenMiddleware.validJWT, OrderController.findById)
    .patch(VerifyTokenMiddleware.validJWT, OrderController.update)
    .delete(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlyAdminCanDoThisAction, OrderController.delete);

module.exports = OrderRouter;