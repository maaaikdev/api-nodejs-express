const swaggerJsdoc = require("swagger-jsdoc");

/**
 * API Congif Info
 */

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: "API Documentation - Course Node REST",
        version: "1.0.1"
    },
    servers: [
        {
            url: "http://localhost:3001/api"
        },
        {
            url: "https://infinite-plateau-49566-28e2db1257de.herokuapp.com/api"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            }
        },
        schemas: {
            authLogin: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                },
            },
            authRegister: {
                type: "object",
                required: ["email", "password", "age", "name"],
                properties: {
                    name: {
                        type: "string",
                    },
                    age: {
                        type: "integer",
                    },
                    email: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                },
            },
            track: {
                type: "object",
                require: ["name", "album", "cover", "artist", "duration", "mediaId"],
                properties: {
                    name: {
                        type: "string"
                    },
                    album: {
                        type: "string"
                    },
                    cover: {
                        type: "string"
                    },
                    artist: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string"
                            },
                            nickname: {
                                type: "string"
                            },
                            nationality:{
                                type: "string"
                            }
                        }
                    },
                    duration: {
                        type: "object",
                        properties: {
                            start: {
                                type: "integer"
                            },
                            end: {
                                type: "integer"
                            }
                        }
                    },
                    mediaId: {
                        type: "string"
                    },
                }
            },
            storage: {
                type: "object",
                properties: {
                    url: {
                        type: "string",
                    },
                    filename: {
                        type: "string",
                    },
                },
            },
        }
    }   
};

/**
 * Options
 */

const options = {
    swaggerDefinition: swaggerDefinition,
    apis: [
        "./routes/*.js"
    ]
};

const openApiConfiguration = swaggerJsdoc(options);

module.exports = openApiConfiguration;