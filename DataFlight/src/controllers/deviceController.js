import Devices from "../models/deviceModel.js"
import randomID from "../scripts/randomID.js"

class deviceController{
    static async createDevice(req,res){
        const data = req.body

        const device = await Devices.create({
            "id": randomID(),
            "name": data.name,
            "colorID": data.colorID,
            "type": data.type,
            "value": data.value,
            "locationID": data.locationID
        })

        res.status(200).send(device)
    }

    static async getDevices(req,res){
        const devices = await Devices.findAll()

        res.status(200).send(devices)
    }

    static async getDevicesByID(req,res){
        const id = req.params.id

        const device = await Devices.findByPk(id)
    
        res.status(200).send(device)
    }

    static async updateDevice(req,res){
        const id = req.params.id
        const data = req.body

        const device = await Devices.findByPk(id)

        device.name = data.name,
        device.colorID = data.colorID,
        device.type = data.type,
        device.value = data.value,
        device.locationID = data.locationID
        device.save()

        res.status(200).send(device)
    }

    static async deleteDevice(req,res){
        const id = req.params.id

        const device = await Devices.findByPk(id)
        
        await device.destroy()
        
        res.status(200).send('Deleted')
    }
}

export default deviceController