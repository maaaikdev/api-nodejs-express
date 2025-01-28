const { handleHttpError } = require("../utils/handleError");

/**
 * Array with premission roles
 */
const checkRole = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        const rolesByUser = user.role; //TODO ["user"]
        //TODO: ["admin"]
        const checkValuesRole = roles.some((singleRole) => rolesByUser.includes(singleRole)); //TODO: true

        if(!checkValuesRole){
            handleHttpError(res, "USER_NOT_PERMISSION", 403)
            return
        }

        next();
    } catch(e){
        handleHttpError(res, "ERROR_PERMISSION", 403)
    }
};

module.exports = checkRole;