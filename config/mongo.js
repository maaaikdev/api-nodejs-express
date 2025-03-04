const mongoose = require("mongoose");

const NODE_ENV = process.env.NODE_ENV;

const dbConnect = async () => {
    try {
        console.log("NODE_ENV", NODE_ENV)
        const DB_URI = (NODE_ENV === 'test') ? process.env.DB_URI_TEST : process.env.DB_URI;
        await mongoose.connect(DB_URI);
        console.log("CONEXION ESTABLECIDA CON MONGO");
    } catch (e) {
        console.log(e + " ERROR DE CONEXION");
    }
};

module.exports = dbConnect;