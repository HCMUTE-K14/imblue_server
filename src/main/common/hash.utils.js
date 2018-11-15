const BCrypt = require('bcryptjs');
const Buffer = require('buffer').Buffer;

const HashUtils = {};

HashUtils.hashBcrypt = hashBcrypt;
HashUtils.hashBcryptBase64 = hashBcryptBase64;

module.exports = HashUtils;

//Hash string use Brcypt Althorigm
function hashBcrypt(plainText) {
	return hashBcrypt(plainText, 100);
}

function hashBcrypt(plainText, saltInt) {
    let salt = BCrypt.genSaltSync(saltInt);
    return BCrypt.hashSync(plainText, salt);
}

//Encode Base64 hash string
function hashBcryptBase64(plainText) {
    let hashedText = hashBcrypt(plainText);
    return Buffer.from(hashedText).toString('base64');
}