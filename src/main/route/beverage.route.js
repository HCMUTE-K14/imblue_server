const Express = require('express');
const BeverageController = require('../controller/beverage.controller');
const VerifyTokenMiddleware = require('../middleware/verify-token.middleware');
const PermissionMiddleware = require('../middleware/auth-permission.middleware');

const BeverageRouter = Express.Router();

 //  {
 //            "category": ["#tag2", "#tag3"],
 //            "name": "Cocacola",
 //            "price": 6,
 //            "unit": "K_VND",
 //            "desciption": "Co ca co laaa"
 // }
BeverageRouter.route('/')
    .get(VerifyTokenMiddleware.validJWT, BeverageController.list)
    .post(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlyAdminCanDoThisAction, BeverageController.create)
    .delete(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlyAdminCanDoThisAction, BeverageController.bulkDelete);

BeverageRouter.route('/:beverageId')
	.get(VerifyTokenMiddleware.validJWT, BeverageController.findById)
    .patch(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlyAdminCanDoThisAction, BeverageController.update)
    .delete(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlyAdminCanDoThisAction, BeverageController.delete);


module.exports = BeverageRouter;