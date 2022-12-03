import fast from "../fast/fast.js"
import Events from "../models/eventModel.js"

class eventController{
    static createEvent(req,res){
        const data = req.body

        const event = {
            "type": data.type,
            "deviceID": data.deviceID,
            "value": data.value,
            "tag": data.tag
        }

        Events.create(event)
        .then(() => {
            res.status(200).json({
                "created": true
            })
        })
        .catch((err) => {
            res.status(500).json(err)
        })

        fast.newEvent(event)
    }

    static async readEvent(req,res){
        Events.findAll()
        .then((events) => {
            res.status(200).json(events)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    }
}

export default eventController