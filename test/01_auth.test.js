const request = require("supertest");
const app = require("../app");
const { userModel } = require("../models")

const testAuthLogin = {
    "email": "reyes@test.ni",
    "password": "435345ergerge"
}

const testAuthRegister = {
    "name": "Jorge Pinzon",
    "age": 22,
    "email": "pinzon@test.com",
    "password": "12345678"
}

/**
 * This is before the tests
 */

beforeAll(async () => {
    await userModel.deleteMany()
})

describe("[AUTH] this is the /api/auth test", () => {
    test("It should return 404 error when the user doesn't exist", async () => {

        const response = await request(app)
        .post("/api/auth/login")
        .send(testAuthLogin)

        expect(response.statusCode).toEqual(404)
    })

    test("It should return 201 to register user", async () => {

        const response = await request(app)
        .post("/api/auth/register")
        .send(testAuthRegister)

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("data");
        expect(response.body).toHaveProperty("data.token");
        expect(response.body).toHaveProperty("data.user");
    })
})