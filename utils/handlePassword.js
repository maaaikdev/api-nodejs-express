const bcryptjs = require("bcryptjs");


/**
 * Password without encrypt
 * @param {*} passwrodPlain
 */
const encrypt = async (passwrodPlain) => {
    const hash = await bcryptjs.hash(passwrodPlain, 10);
    return hash
};

/**
 * Password (passwrodPlain) without encrypt & Password (hash) encrypted
 * @param {*} passwrodPlain
 * @param {*} hash
 */
const compare = async (passwrodPlain, hashPassword) => {
    return await bcryptjs.compare(passwrodPlain, hashPassword)
};

module.exports = { encrypt, compare };