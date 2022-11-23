import express from 'express'
import routes from './routes/index.js'
import dbMysql from './config/mysql.js'

//Mysql Connection
dbMysql.authenticate()
    .then(() => {
    console.log("Connection estabilished with mysql");
    })
    .catch((err) => {
    console.log("Failed to sync db: " + err.message);
    });
    await dbMysql.sync()

//Express
const app = express()
routes(app)

export default app