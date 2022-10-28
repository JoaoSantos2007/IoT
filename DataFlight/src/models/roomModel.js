import {DataTypes} from "sequelize";
import dbMysql from "../config/mysql.js";

const Rooms = dbMysql.define('rooms',{
    "id": {
        type: DataTypes.STRING(25),
        allowNull: false,
        primaryKey: true,

    },
    "name": {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    "location": {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    "colorID": {
        type: DataTypes.STRING(50),
        allowNull: false
    },
},
{
    timestamps: false
})

export default Rooms