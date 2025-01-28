const express = require("express");
const router = express.Router();
const { validatorLogin, validatorRegister } = require("../validators/auth");

const { tokenSign } = require("../utils/handleJwt");
const { registerCtrl, loginCtrl } = require("../controllers/auth")


//TODO http://localhost:3001/api/auth/login
//TODO http://localhost:3001/api/auth/register

/**
 * Route register new user
 * @openapi
 * /auth/register:
 *      post:
 *          tags: 
 *              - auth
 *          summary: "Register a new user"
 *          description: "To register a new user use this route"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *                  '201':
 *                      description: "Register user is success"
 *                  '403':
 *                      description: "Register user is invalid"
 */

router.post('/register', validatorRegister, registerCtrl);

/**
 * Route register new user
 * @openapi
 * /auth/login:
 *      post:
 *          tags: 
 *              - auth
 *          summary: "Login user"
 *          description: "To Login a user use this route"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authLogin"
 *          responses:
 *                  '201':
 *                      description: "Login user is success"
 *                  '403':
 *                      description: "Login user is invalid"
 */
router.post('/login', validatorLogin, loginCtrl);

module.exports = router;