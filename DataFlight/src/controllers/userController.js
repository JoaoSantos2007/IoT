import Users from "../models/userModel.js"
import randomID from "../scripts/randomID.js"

class userController{
    static createUser(req,res){
        const data = req.body

        Users.create({
            "id": randomID(),
            "email": data.email,
            "name": data.name,
            "hashPassword": Users.hashPassword(data.password)
        })
        .then((user) => {
            res.status(201).json({
                "created": true,
                user
            })
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    }

    static readUser(req,res){
        const user = req.user

        res.status(200).json(user)
    }

    static updateUser(req,res){
        const user = req.user
        const data = req.body

        user.update({
            "name": data.name,
        })
        .then((user) => {

            res.status(200).json({
                "updated": true,
                "user": user
            })
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    }

    static deleteUser(req,res){
        const user = req.user

        user.destroy()
        .then(() => {
            res.status(200).json({
                "deleted": true
            })
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    }
}

export default userController