import { DataTypes } from "sequelize";
import dbMysql from "../config/mysql.js";

const Devices = dbMysql.define('devices',{
    "id": {
        type: DataTypes.STRING(25),
        allowNull: false,
        primaryKey: true
    },
    "colorID" :{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    "name":{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    "type": {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    "value": {
        type: DataTypes.STRING(10),
        defaultValue: "false"
    },
    "locationID": {
        type: DataTypes.STRING(25),
        allowNull: false
    }
},
{
    timestamps: false
})

export default Devices