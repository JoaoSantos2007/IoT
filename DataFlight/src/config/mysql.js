import {Sequelize} from 'sequelize'
import dotenv from "dotenv";
dotenv.config();

const dbMysql = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    logging: false
  }
)

//Mysql Connection
dbMysql.authenticate()
    .then(() => {
    console.log("Connection estabilished with mysql");
    })
    .catch((err) => {
    console.log("Failed to sync db: " + err.message);
    });

await dbMysql.sync()

export default dbMysql;