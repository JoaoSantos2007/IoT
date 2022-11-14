import Rooms from "../models/roomModel.js"
import Devices from "../models/deviceModel.js"
import randomID from "../scripts/randomID.js"

class roomController{

    //Create room
    static createRoom(req,res){
        const data = req.body
        
        Rooms.create({
            "id": !data.id ? randomID() : data.id,
            "name": data.name,
            "colorID": data.colorID
        })
        .then((room) => {
            res.status(201).json({
                "created": true,
                "room": room
            })
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    }

    //Read rooms
    static getRooms(req,res){
        const id = req.params.id
        
        if(!!id){
            Devices.findAll({
                where: {
                    roomID: id
                }
            })
            .then((devices) => {
                const room = req.room

                room["devices"] = devices
                
                res.status(200).json(room)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
        }else{
            Rooms.findAll()
            .then((rooms) => {
                res.status(200).json(rooms)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
        }
    }

    //Update room
    static updateRoom(req,res){
        const room = req.room
        const data = req.body

        room.update({
            "name": data.name,
            "colorID": data.colorID
        })
        .then((room) => {
            res.status(200).json({
                "updated": true,
                "room": room
            })
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    }

    //Delete room
    static deleteRoom(req,res){
        const room = req.room

        room.destroy()
        .then(() => {
            res.status(200).json({
                "deleted": true
            })
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    }
}

export default roomController