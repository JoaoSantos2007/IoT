import {body, validationResult} from "express-validator"
import Users from '../models/userModel.js'

class authValidator{
    static login(){
        return([
            body("email").trim().isEmail().isLength({min: 1,max: 150}).custom(async (email) => {
                const user = await Users.findOne({
                    where: {
                        "email": email
                    }
                })

                if(!user) return Promise.reject("incorrect login!")
            }),
            body("password").isLength({min: 1,max: 50}),
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

export default authValidator