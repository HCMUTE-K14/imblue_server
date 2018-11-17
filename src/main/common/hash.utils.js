const BCrypt = require('bcryptjs');
const Buffer = require('buffer').Buffer;

const HashUtils = {};

HashUtils.hashBcrypt = hashBcrypt;
HashUtils.hashBcryptBase64 = hashBcryptBase64;
HashUtils.comparePassword = comparePassword;

module.exports = HashUtils;

//Hash string use Brcypt Althorigm
function hashBcrypt(plainText) {
    return hashBcrypt(plainText, 10);
}

function hashBcrypt(plainText, saltInt) {
    let salt = BCrypt.genSaltSync(saltInt);
    return BCrypt.hashSync(plainText, salt);
}

//Hash string and encode base64
function hashBcryptBase64(plainText) {
    let hashedText = hashBcrypt(plainText);
    return Buffer.from(hashedText).toString('base64');
}

function comparePassword(cadidatePassword, passwordFromDatabase) {
    let password = Buffer.from(passwordFromDatabase, 'base64').toString('ascii');
    return BCrypt.compareSync(cadidatePassword, password);
}