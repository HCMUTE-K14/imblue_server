const Express = require('express');
const AuthMiddleware = require('../middleware/auth.middleware');
const AuthController = require('../controller/auth.controller');
const AuthRouter = Express.Router();

//curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"username":"infamousss", "password": "1234"}' http://localhost:8080/rest/auth/login
// POST /rest/auth/login HTTP/1.1
// Host: localhost:8080
// Content-Type: application/json
// {
// 	"username": "infamous",
// 	"password": "1234"
// }
AuthRouter.route('/login')
    .post(AuthMiddleware.isValidRequest, AuthMiddleware.isPasswordAndUserMatch, AuthController.login);


module.exports = AuthRouter;