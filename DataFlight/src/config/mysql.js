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

export default dbMysql;