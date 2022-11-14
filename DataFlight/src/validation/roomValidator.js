import {body, param,validationResult} from "express-validator"
import Rooms from "../models/roomModel.js"

class roomValidator{
    static getRoom(){
        let room = null

        return([
            param("id").trim().isString().isLength({max: 25}).custom(async (value) => {
                room = await Rooms.findByPk(value)

                if(!room) return Promise.reject("room id invalid!")
            }),
            (req, res, next) => {
                req.room = room

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
            body("colorID").trim().isString().isLength({min:1,max: 50}),
            body("id").trim().isLength({max: 25}).custom(async (value) => {
                const room = await Rooms.findByPk(value)

                if(room) return Promise.reject("ID already in use")
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

    static putRoom(){
        let room = null

        return([
            body("name").trim().isString().isLength({min:1,max: 100}),
            body("colorID").trim().isString().isLength({min:1,max:100}),
            param("id").trim().isLength({max: 25}).custom(async (value) => {
                room = await Rooms.findByPk(value)

                if(!room) return Promise.reject("room id invalid")
            }),
            (req, res, next) => {
                req.room = room

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
        let room = null

        return([
            param("id").trim().isLength({max: 25}).custom(async (value) => {
                room = await Rooms.findByPk(value)

                if(!room) return Promise.reject("room id invalid")
            }),
            (req, res, next) => {
                req.room = room
                
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