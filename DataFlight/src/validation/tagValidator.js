import {body,param,validationResult} from "express-validator"
import Tags from "../models/tagModel.js"

class tagValidator{
    static getTag(){
        let tag = null

        return [
            param("id").isNumeric().custom(async (value) => {
                tag = await Tags.findByPk(value)

                if(!tag) return Promise.reject("tag id is invalid")
            }),
            (req, res, next) => {
                req.tag = tag

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(404).json({ errors: errors.array() });
                }
                else(
                    next()
                )
            }
        ]
    }

    static postTag(){
        return [
            body("deviceID").trim().isString().isLength({max: 25,min: 1}),
            body("tag").trim().isString().isLength({max: 20,min: 1}),
            body("value").trim().isString().isLength({max: 50,min: 1}),
            (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(404).json({ errors: errors.array() });
                }
                else(
                    next()
                )
            }
        ]
    }

    static putTag(){
        let tag = null

        return [
            body("deviceID").trim().isString().isLength({max: 25,min: 1}),
            body("tag").trim().isString().isLength({max: 20,min: 1}),
            body("value").trim().isString().isLength({max: 50,min: 1}),
            param("id").isNumeric().custom(async (value) => {
                tag = await Tags.findByPk(value)
    
                if(!tag) return Promise.reject("tag id is invalid")
            }),
            (req, res, next) => {
                req.tag = tag
    
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(404).json({ errors: errors.array() });
                }
                else(
                    next()
                )
            }
        ]
    }

    static deleteTag(){
        let tag = null

        return [
            param("id").isNumeric().custom(async (value) => {
                tag = await Tags.findByPk(value)

                if(!tag) return Promise.reject("tag id is invalid")
            }),
            (req, res, next) => {
                req.tag = tag

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(404).json({ errors: errors.array() });
                }
                else(
                    next()
                )
            }
        ]
    }
}

export default tagValidator