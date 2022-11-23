import dbMysql from '../config/mysql.js'
import { DataTypes, STRING } from 'sequelize'
import bcrypt from 'bcrypt'

const SALT = process.env.SALT

const Users = dbMysql.define("users",{
    "id": {
        type: DataTypes.STRING(25),
        allowNull: false,
        primaryKey: true
    },
    "email": {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    "name": {
        type: DataTypes.STRING(50),
        allowNull: false   
    },
    "hashPassword": {
        type: STRING(),
        allowNull: false
    }
},{
    timestamps: false
})

await Users.sync()

Users.hashPassword = (password) => {
    return bcrypt.hashSync(password,SALT)
}

export default Users