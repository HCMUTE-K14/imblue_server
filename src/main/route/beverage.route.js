const Express = require('express');
const BeverageController = require('../controller/beverage.controller');
const VerifyTokenMiddleware = require('../middleware/verify-token.middleware');
const PermissionMiddleware = require('../middleware/auth-permission.middleware');

const BeverageRouter = Express.Router();

// {
// 	"name": "Coffee",
// 	"description": "Coffee Trung Nguyen",
// 	"price": 30,
// 	"unit": "VND",
// 	"category": ["#abc", "xyz"]
// }
BeverageRouter.route('/')
    .get(VerifyTokenMiddleware.validJWT, BeverageController.list)
    .post(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlyAdminCanDoThisAction, BeverageController.create)
    .delete(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlyAdminCanDoThisAction, BeverageController.bulkDelete);

BeverageRouter.route('/:beverageId')
	.get(VerifyTokenMiddleware.validJWT, BeverageController.findById)
    .patch(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlyAdminCanDoThisAction, BeverageController.update)
    .delete(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlyAdminCanDoThisAction, BeverageController.delete);
    
BeverageRouter.route('/category/:categoryId')
  .get(VerifyTokenMiddleware.validJWT, BeverageController.findBeverageByCategoryId)


module.exports = BeverageRouter;
