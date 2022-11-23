import authMiddleware from "../middlewares/authMiddleware.js"
import Users from "../models/userModel.js"

class authController{
    static login(req,res){
        const data = req.body

        Users.findOne({
            where: {
                email: data.email
            }
        })
        .then((user) => {
            if(Users.hashPassword(data.password) === user.hashPassword){
                const token = authMiddleware.createToken(user)
    
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: !!req.headers["sec-fetch-mode"],
                    sameSite: 'none'
                })
    
                res.status(200).json({
                    "auth": true,
                    token  
                })
            }else{
                res.status(401).json({
                    "msg": "incorrect login!"
                })
            }
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    }

    static logout(req,res){
        res.cookie("token", "", {
            httpOnly: true,
            secure: !!req.headers["sec-fetch-mode"],
            sameSite: 'none',
        })

        res.status(200).json({
            "left": true
        })
    }
}

export default authController