const { handleHttpError } = require("../utils/handleError");
const { verifySign } = require("../utils/handleJwt");
const { userModel } = require("../models");
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();


/**
 * Get Token and protect route
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authMiddleware = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            handleHttpError(res, "NOT TOKEN", 401);
            return
        };
        
        const token = req.headers.authorization.split(' ').pop(); //TODO Bearer Token
        const dataToken = await verifySign(token);

        if(!dataToken){
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
            return  
        }
        
        const query = {
            [propertiesKey.id]: dataToken[propertiesKey.id]
        }

        const user = await userModel.findOne(query); //TODO findOne exits in Mongo and MySql

        req.user = user;

        next();

    } catch(e) {
        handleHttpError(res, "NOT_SESSION", 401)
    }
};

module.exports = authMiddleware;