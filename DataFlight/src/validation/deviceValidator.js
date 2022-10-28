import {body, param, validationResult} from "express-validator"
import Devices from '../models/deviceModel.js'

class deviceValidator{
    static getDevice(){
        return([
            param("id").trim().isString().isLength({min:1, max:25}).custom(async (value) => {
                const device = await Devices.findByPk(value)

                if(!device) return Promise.reject()
            }),
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

    static postDevice(){
        return([
            body("name").trim().isString().isLength({min:1,max:100}),
            body("colorID").trim().isString().isLength({min:1,max:30}),
            body("type").trim().isString().isLength({min:1,max:25}),
            body("locationID").trim().isString().isLength({min:1,max:25}),
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
        return([
            body("name").trim().isString().isLength({min:1,max:100}),
            body("colorID").trim().isString().isLength({min:1,max:30}),
            body("type").trim().isString().isLength({min:1,max:25}),
            body("locationID").trim().isString().isLength({min:1,max:25}),
            param("id").trim().isString().isLength({min:1, max:25}).custom(async (value) => {
                const device = await Devices.findByPk(value)

                if(!device) return Promise.reject()
            }),
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

    static deleteDevice(){
        return([
            param("id").trim().isString().isLength({min:1, max:25}).custom(async (value) => {
                const device = await Devices.findByPk(value)

                if(!device) return Promise.reject()
            }),
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
}

export default deviceValidator