const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        const DB_URI = await process.env.DB_URI;
        await mongoose.connect(DB_URI);
        console.log("CONEXION ESTABLECIDA CON MONGO");
    } catch (e) {
        console.log(e + " ERROR DE CONEXION");
    }
};

module.exports = dbConnect;