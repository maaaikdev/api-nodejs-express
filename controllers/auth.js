const { matchedData } = require("express-validator");
const { userModel } = require("../models");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError")

/**
 * Controller to register user
 * @param {*} req 
 * @param {*} res 
 */

// const registerCtrl = async (req, res) => {    
//     try {
//         req = matchedData(req);
//         const existingUser = await userModel.findOne({ email: req.email });

//         if(existingUser){
//             return res.status(400).json({error: "This email already exits"});
//         }
//         const passwordHash = await encrypt(req.password);
//         const body = {...req, password: passwordHash};
//         const dataUser = await userModel.create(body);

//         const data = {
//             token: await tokenSign(dataUser),
//             user: dataUser,
//         }
//         res.status(201)
//         res.send({data})
//     } catch(e){
//         handleHttpError(res, 'ERROR_REGISTER_USER')
//     }
// };
const registerCtrl = async (req, res) => {    
    try {
        req = matchedData(req);
        const passwordHash = await encrypt(req.password);
        const body = {...req, password: passwordHash};
        const dataUser = await userModel.create(body);

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser,
        }
        res.status(201);
        res.send({data})
    } catch(e){
        handleHttpError(res, 'ERROR_REGISTER_USER')
    }
};

/**
 * Controller to login user
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {    
    try {
        req = matchedData(req); // 
        const user = await userModel.findOne({ email: req.email });
        if(!user){
            handleHttpError(res, 'USER_NOT_EXISTS', 404);
            return
        }

        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword);

        if(!check) {
            handleHttpError(res, 'PASSWORD_INVALID', 401);
            return
        };

        user.set('password', undefined, { strict: false })
        const data = {
            token: await tokenSign(user),
            user: user
        };
        res.status(201)
        res.send({data})

    } catch(e){
        handleHttpError(res, 'ERROR_LOGIN_USER')
    }
};

module.exports = { registerCtrl, loginCtrl };