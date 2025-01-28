require("dotenv").config();
const express = require('express');
const cors = require('cors');
const swaggerUI = require("swagger-ui-express");
const morganBody = require("morgan-body");
const openApiConfiguration = require("./docs/swagger")
const loggerStream = require("./utils/handleLogger");
const dbConnectNoSql = require('./config/mongo');
const { dbConnectMySql } = require("./config/mysql")
const app = express();

const ENGINE_DB = process.env.ENGINE_DB;

app.use(cors());
app.use(express.json());
app.use(express.static("storages"));


morganBody(app, {
    noColors: true,
    stream: loggerStream,
    skip: function(req, res){
        return res.statusCode < 400 //TODO 2xx, 3xx send greater than 400
    }
})

const port = process.env.PORT || 3000;

/**
 * Define paths documentation
 */

app.use('/documentation', 
    swaggerUI.serve, 
    swaggerUI.setup(openApiConfiguration)
)

/**
 * Here we invoke the routes
 */

app.use("/api", require("./routes"));


app.listen(port, () => {
    console.log('Your app is ready on http://localhost:'+port)
});

( ENGINE_DB === 'nosql' ) ?  dbConnectNoSql() : dbConnectMySql()

