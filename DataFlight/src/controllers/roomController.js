import Rooms from "../models/roomModel.js"
import Devices from "../models/deviceModel.js"
import randomID from "../scripts/randomID.js"
import { where } from "sequelize"

class roomController{
    static async createRoom(req,res){
        const data = req.body
        
        const room = await Rooms.create({
            "id": randomID(),
            "name": data.name,
            "location": data.location,
            "colorID": data.colorID
        })

        res.status(200).send(room)
    }

    static async getRooms(req,res){
        const rooms = await Rooms.findAll()
        
        res.status(200).send(rooms)
    }

    static async getRoomsByID(req,res){
        const id = req.params.id

        const rooms = await Rooms.findByPk(id)

        const devices = await Devices.findAll({
            where: {
                locationID: rooms.id
            }
        })

        const room = rooms.toJSON()
        room["devices"] = devices

        res.status(200).send(room)
    }

    static async updateRoom(req,res){
        const id = req.params.id
        const data = req.body

        const room = await Rooms.findByPk(id)
        
        room.name = data.name
        room.location = data.location
        room.colorID = data.colorID
        room.save()

        res.status(200).send(room)
    }

    static async deleteRoom(req,res){
        const id = req.params.id

        const room = await Rooms.findByPk(id)
        await room.destroy()

        res.status(200).send('deleted')
    }
}

export default roomController