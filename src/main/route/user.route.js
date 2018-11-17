const Express = require('express');
const UserController = require('../controller/user.controller');
const VerifyTokenMiddleware = require('../middleware/verify-token.middleware');
const PermissionMiddleware = require('../middleware/auth-permission.middleware');

const UserRouter = Express.Router();

// POST /rest/users/registration HTTP/1.1
// Host: localhost:8080
// Content-Type: application/json
// {
// 	"username": "infamous",
// 	"password": "1234",
// 	"display_name": "ADMIN"
// }
UserRouter.route('/registration')
    .post(UserController.create);

UserRouter.route('/:userId')
    .patch(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlySameUserOrAdminCanDoThisAction, UserController.update)
    .delete(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlySameUserOrAdminCanDoThisAction, UserController.deleteById);

// GET /rest/users/ HTTP/1.1
// Host: localhost:8080
// Content-Type: application/json
// Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YmVmOTBjZjIzMGY5ZjEwOTMyOTZjOGIiLCJkaXNwbGF5TmFtZSI6IkFETUlOIiwiaWF0IjoxNTQyNDI2OTE5LCJleHAiOjE1NDI0NDQ5MTl9.iPmjZsEeVPQsoTROIZpQm7PMcIpHpQwahtYkMVcVD-aPvXKjsyWmy8HOuqhzb-U9DXkh6a_63En4v10XDYNhDw
UserRouter.route('/')
    .get(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlyAdminCanDoThisAction, UserController.list)
    .delete(VerifyTokenMiddleware.validJWT, PermissionMiddleware.onlyAdminCanDoThisAction, UserController.delete);

module.exports = UserRouter;