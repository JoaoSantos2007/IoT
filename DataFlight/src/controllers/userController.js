import tagModel from "../models/tagModel.js"
import loginQuery from "../query/loginQuery.js"

class userController{
    static async getUser(req,res){
        const data = req.body
        
        let msg = {
            'status':'false',
            'user': ''
        }

        if(tagModel.validateTAG(data.userTAG)){
            const userID = await tagModel.getUserID(data.userTAG)
            const user = await loginQuery.getUserByID(userID)

            msg.status = 'true'
            msg.user = JSON.stringify(user)   
        }

        res.status(200).json(msg)
    }

    static async
}

export default userController