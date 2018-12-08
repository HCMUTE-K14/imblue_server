const Express = require('express');
const CategoryController = require('../controller/category.controller');
const VerifyTokenMiddleware = require('../middleware/verify-token.middleware');
const PermissionMiddleware = require('../middleware/auth-permission.middleware');

const CategoryRouter = Express.Router();

// {
//      "name": "ABC"
// }
CategoryRouter.route('/')
    .get(VerifyTokenMiddleware.validJWT, CategoryController.list)
    .post(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlyAdminCanDoThisAction, CategoryController.create)
    .delete(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlyAdminCanDoThisAction, CategoryController.bulkDelete);

CategoryRouter.route('/:categoryId')
	  .get(VerifyTokenMiddleware.validJWT, CategoryController.findById)
    .patch(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlyAdminCanDoThisAction, CategoryController.update)
    .delete(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlyAdminCanDoThisAction, CategoryController.delete);


module.exports = CategoryRouter;
