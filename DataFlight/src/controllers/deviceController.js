import Devices from "../models/deviceModel.js"
import randomID from "../scripts/randomID.js"

class deviceController{
    //Create Device
    static createDevice(req,res){
        const data = req.body

        Devices.create({
            "id": data.id ? data.id : randomID(),
            "name": data.name,
            "type": data.type,
            "roomID": data.roomID,
            "value": data.value,
            "mqttID": data.mqttID
        })
        .then((device)=> {
            res.status(201).json({
                "created": true,
                "device": device
            })
        })
        .catch((error) => {
            res.status(500).json(error)
        })
    }

    //Read Devices
    static getDevices(req,res){
        const id = req.params.id

        if(id){
            res.status(200).json(req.device)
        }else{
            Devices.findAll()
            .then((devices) => {
                res.status(200).json(devices)
            })
            .catch((error) => {
                res.status(500).json(error)
            })
        }
    }

    //Update Device
    static updateDevice(req,res){
        const device = req.device
        const data = req.body

        device.update({
            "name": data.name,
            "type": data.type,
            "value": data.value,
            "roomID": data.roomID,
            "mqttID": data.mqttID
        })
        .then((device) => {
            res.status(200).json({
                "updated": true,
                "device": device
            });
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    //Delete device
    static deleteDevice(req,res){
        const device = req.device

        device.destroy()
        .then(() => {
            res.status(200).json({
                "deleted": true
            });
        }).catch((error) => {
            res.status(500).json(error)
        })
    }
}

export default deviceController