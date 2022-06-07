import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

const dbLOGIN = mysql.createConnection({
    "host": process.env.MYSQL_HOST,
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD, 
    "database": process.env.MYSQL_DATABASE
})

dbLOGIN.connect((err) => {
    if (!err) console.log('Connection established with MYSQL!')
    else throw err
})

dbLOGIN.query('CREATE TABLE IF NOT EXISTS users (id VARCHAR(25) PRIMARY KEY,displayName VARCHAR(30),email VARCHAR(100),Userpassword VARCHAR(50),photoURL VARCHAR(10000))', (err) => {
    if(err) throw err
})

export default dbLOGIN