const Express = require('express');
const OrderController = require('../controller/order.controller');
const VerifyTokenMiddleware = require('../middleware/verify-token.middleware');
const PermissionMiddleware = require('../middleware/auth-permission.middleware');

const OrderRouter = Express.Router();

// Data for creating
// {
// 	"table_no": 123,
// 	"user_created": "5c05407cfbb4ff0569feb64e",
// 	"list_menu_item":[
// 		{
// 			"quantity": 1,
// 			"beverage": "5c054968fbb4ff0569feb651" // available on beverage table
// 		},
// 		{
// 			"quantity": 2,
// 			"beverage": "5c0549e0fbb4ff0569feb652" // available on beverage table
// 		}
// 	],
// 	"status": "PROCESSING"
// }

//Update at PATCH rest/orders/:orderId
// {
// 	"table_no": 123,
// 	"user_created": "5c05407cfbb4ff0569feb64e",
// 	"list_menu_item":[
// 		{
// 			"quantity": 1,
// 			"beverage": "5c054968fbb4ff0569feb651"
// 		},
// 		{
// 			"quantity": 2,
// 			"beverage": "5c0549e0fbb4ff0569feb652"
// 		}
// 	],
// 	"status": "DONE"
// }
OrderRouter.route('/')
    .get(VerifyTokenMiddleware.validJWT, OrderController.list)
    .post(VerifyTokenMiddleware.validJWT, OrderController.create)
    .delete(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlyAdminCanDoThisAction, OrderController.bulkDelete);

OrderRouter.route('/:orderId')
	  .get(VerifyTokenMiddleware.validJWT, OrderController.findById)
    .patch(VerifyTokenMiddleware.validJWT, OrderController.update)
    .delete(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlyAdminCanDoThisAction, OrderController.delete);

OrderRouter.route('/changeStatus')
  .post(VerifyTokenMiddleware.validJWT, OrderController.changeStatus);

module.exports = OrderRouter;
