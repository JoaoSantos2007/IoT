import {body, param,validationResult} from "express-validator"
import Rooms from "../models/roomModel.js"

class roomValidator{
    static getRoom(){
        return([
            param("id").trim().isString().isLength({max: 25,min: 25}).custom(async (value) => {
                const room = await Rooms.findByPk(value)

                if(!room) return Promise.reject()
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

    static postRoom(){
        return([
            body("name").trim().isString().isLength({min:1,max: 100}),
            body("location").trim().isString().isLength({min:1,max:100}),
            body("colorID").trim().isString().isLength({min:1,max:100}),
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

    static putRoom(){
        return([
            body("name").trim().isString().isLength({min:1,max: 100}),
            body("location").trim().isString().isLength({min:1,max:100}),
            body("colorID").trim().isString().isLength({min:1,max:100}),
            param("id").trim().isString().isLength({max: 25,min: 25}).custom(async (value) => {
                const room = await Rooms.findByPk(value)

                if(!room) return Promise.reject()
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

    static deleteRoom(){
        return([
            param("id").trim().isString().isLength({max: 25,min: 25}).custom(async (value) => {
                const room = await Rooms.findByPk(value)

                if(!room) return Promise.reject()
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

export default roomValidator