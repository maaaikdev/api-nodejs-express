const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("./handlePropertiesEngine");
const propertiesKey = getProperties();

/**
 * We should send the user object from DB
 * @param {*} user
 */
const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            [propertiesKey.id]: user[propertiesKey.id], //TODO Establish the id property to both DATABASE NoSQL and MySQL
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );

    return sign;
};

/**
 * We should send the session token JWT
 * @param {*} tokenJwt
 */
const verifySign = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET);
    } catch(e) {
        return null;
    }
};

module.exports = { tokenSign, verifySign };