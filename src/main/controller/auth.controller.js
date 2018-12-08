const TokenUtils = require('../common/token.utils');
const Config = require('../config');
const UserService = require('../service/user.service');

const AuthController = {};

AuthController.login = async (req, res) => {
    try {
        let loginInfo = req.body;
        loginInfo.isAdmin = await UserService.isAdmin(loginInfo.userId);

        let token = TokenUtils.generateAccessToken(loginInfo);

        res.status(200).json({
            sucess: true,
            accessToken: token,
            expried_time: Config.jwt_access_token_exp
        });
    } catch (err) {
        res.status(500).json({ sucess: false, errors: 'Authorize failed' });
    }
}

AuthController.refreshToken = (req, res) => {
    //TODO: Implement later
}

module.exports = AuthController;
