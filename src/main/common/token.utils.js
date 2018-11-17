const Crypto = require('crypto');
const JWT = require('jsonwebtoken');

const Config = require('../config');
const TokenUtils = {};

TokenUtils.makeRefreshTokenValue = makeRefreshTokenValue;
TokenUtils.generateRefreshTokenKey = generateRefreshTokenKey;
TokenUtils.generateRefreshToken = generateRefreshToken;
TokenUtils.generateAccessToken = generateAccessToken;
TokenUtils.generateAccessTokenWithExp = generateAccessTokenWithExp;
module.exports = TokenUtils;

function makeRefreshTokenValue(userId) {
    return userId + Config.jwt_secret;
}

function generateRefreshTokenKey() {
    return Crypto.randomBytes(16).toString('base64');
}

function generateRefreshToken(refreshTokenKey, refreshTokenValue) {
    let hash = Crypto.createHmac('sha512', refreshTokenKey).update(refreshTokenValue).digest('base64');
    let buffer = new Buffer(hash);
    return buffer.toString('base64');
}

function generateAccessToken(loginInfo) {
	let exp;
	if(Config.jwt_access_token_exp) {
		exp = Config.jwt_access_token_exp;
	}else {
		exp = '5h';
	}

	return generateAccessTokenWithExp(loginInfo, exp);
}

function generateAccessTokenWithExp(loginInfo, exp) {
	return JWT.sign(loginInfo, Config.jwt_secret, { expiresIn: exp,  algorithm:  "HS512" });
}

