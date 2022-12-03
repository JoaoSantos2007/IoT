import {body, param, validationResult} from "express-validator"
import Devices from '../models/deviceModel.js'

class deviceValidator{
    static getDevice(){
        let device = ""

        return([
            param("id").trim().isString().isLength({min:1, max:25}).custom(async (value) => {
                device = await Devices.findByPk(value)

                if(!device) return Promise.reject("invalid device id")
            }),
            (req, res, next) => {
                req.device = device

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(404).json({ errors: errors.array() });
                }
                else(
                    next()
                )
            }
        ])
    }

    static postDevice(){
        return([
            body("id").isLength({max: 25}).custom(async (value) => {
                const device = await Devices.findByPk(""+value)

                if(!!device) return Promise.reject("ID already in use")
            }),
            body("name").trim().isString().isLength({min: 1,max: 100}),
            body("type").trim().isString().isLength({min: 1,max: 30}),
            body("value").isLength({max: 10}),
            body("roomID").trim().isString().isLength({min: 25,max: 25}),
            body("mqttID").isInt(),
            (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(404).json({ errors: errors.array() });
                }
                else(
                    next()
                )
            }
        ])
    }

    static putDevice(){
        let device = ""

        return([
            body("name").trim().isString().isLength({min: 1,max: 100}),
            body("type").trim().isString().isLength({min: 1,max: 30}),
            body("value").isLength({max: 10}),
            body("roomID").trim().isString().isLength({max: 25}),
            body("mqttID").isInt(),
            param("id").trim().isString().isLength({max: 25}).custom(async (value) => {
                device = await Devices.findByPk(value)

                if(!device) return Promise.reject("invalid device id")
            }),
            (req, res, next) => {
                req.device = device

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(404).json({ errors: errors.array() });
                }
                else(
                    next()
                )
            }
        ])
    }

    static deleteDevice(){
        let device = ""

        return([
            param("id").trim().isString().isLength({min:1, max:25}).custom(async (value) => {
                device = await Devices.findByPk(value)

                if(!device) return Promise.reject("invalid device id")
            }),
            (req, res, next) => {
                req.device = device

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(404).json({ errors: errors.array() });
                }
                else(
                    next()
                )
            }
        ])
    }
}

export default deviceValidator