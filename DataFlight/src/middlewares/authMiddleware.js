import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Users from '../models/userModel.js'

const SECRET = process.env.SECRET
const SALT = process.env.SALT

class authMiddleware{
    static createToken(user){
        const token = jwt.sign(
            {
                "email": user.email,
                "userID": authMiddleware.hashUserID(user.id)
            },
            SECRET,
            {
                "expiresIn": "15min"
            }
        )

        return token
    }

    static verifToken(req,res,next){
        const token = req.cookies.token

        if(!token){
            //No token provided
            res.status(401).json({
                "msg": "No token provided!"
            })
            return
        }

        //Verify Json Web Token
        jwt.verify(token,SECRET,async (err,token) => {
            if(err){
                res.status(401).json({"msg": `Token error: ${err.message}`})
                return
            }

            const email = token.email
            const user = await authMiddleware.verifUser(email)

            //Verif User
            if(!user){
                res.status(401).json({
                    "msg": "Token Invalid, Data doesn't match"
                })
                return
            }

            //Verif if userID and token userID is equal
            if(authMiddleware.hashUserID(user.id) === token.userID){
                req.user = user
                next()
            }else{
                res.status(401).json({
                    "msg": "Token Invalid, Data doesn't match"
                })
            }
        })
    }

    static async verifUser(email){
        const user = await Users.findOne({
            where: {
                "email": email
            }
        })

        return user
    }

    static hashUserID(userID){
        return bcrypt.hashSync(userID,SALT)
    }
}

export default authMiddleware