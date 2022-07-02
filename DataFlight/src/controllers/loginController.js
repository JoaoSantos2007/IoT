import loginModel from '../models/loginModel.js'
import loginQuery from '../query/loginQuery.js'

class loginController{


    /*
    ================================
                 CRUD
    ================================
    */

    //Create a user
    static async createUser(req,res){
        const data = req.body

        let statusCode = 500
        const msg = {
            "status": "failed"
        }

        if(await loginModel.validateEmail(data.email)){
            const createUser = await loginQuery.createUser(data)
            if(createUser){
                statusCode = 200
                msg.status = 'Account created with Success'
            }
        }else{
            statusCode = 400
            msg.status = 'Email incorrect or already used'
        }

        res.status(statusCode).send(msg)
    }

    //select user             //OK
    static async getUser(req,res){
        const userTAG = "#" + req.query.tag

        let statusCode = 500
        let msg = {
            'status': 'notFound',
            'user': null
        }

        if(loginModel.validateTAG(userTAG)){
            const userID = await loginModel.getUserID(userTAG)
            const user = await loginQuery.getUser(null,userID)

            msg.user = JSON.stringify({
                'id': user.id,
                'email': user.email,
                'displayName': user.displayName,
                'photoURL': user.photoURL    
            })
            msg.status = 'OK'
            statusCode=200   
        }else{
            msg.status = 'badTAG'
            statusCode = 400
        }

        res.status(statusCode).send(msg)
    }

    //Update user                //OK
    static async updateUser(req,res){
        const userTAG = '#' + req.query.tag
        const data = req.body

        let statusCode = 500
        const msg = {
            'status':'failed'
        }

        if(loginModel.validateTAG(userTAG)){
            const userID = loginModel.getUserID(userTAG)

            const user = await loginQuery.getUser('',userID)
            
            if(!! await loginModel.authentication(user.email,data.password)){
                
                const Userdata = {
                    'displayName': data.displayName,
                    'photoURL': data.photoURL,
                    'userID': userID
                }

                const userUpdated = await loginQuery.updateUser(Userdata)
                if(userUpdated){
                    statusCode = 200
                    msg.status = 'user updated'
                }
            }else{
                statusCode = 401
                msg.status = 'authentication failed'
            }
        }else{
            statusCode = 400
            msg.status = 'badTAG'
        }

        res.status(statusCode).send(msg)
    }

    //Delete user                //OK
    static async deleteUser(req,res){
        const userTAG = '#' + req.query.tag
        const data = req.body

        let statusCode = 500
        const msg = {
            'status': 'failed'
        }

        if(loginModel.validateTAG(userTAG)){
            const userID = loginModel.getUserID(userTAG)

            const user = await loginQuery.getUser('',userID)

            if(!! await loginModel.authentication(user.email,data.password)){
                const deleteUser = await loginQuery.deleteUser({'userID':userID})
                
                if(deleteUser){
                    statusCode = 200
                    msg.status = 'user deleted'
                }
            }else{
                statusCode = 401
                msg.status = 'authentication failed'
            }
        }else{
            statusCode = 400
            msg.status = 'badTAG'
        }

        res.status(statusCode).send(msg)
    }





    //OK
    static async loginAccount(req,res){
        const data = req.body

        let statusCode = 500
        const msg = {
            'status': 'error',
            'loginTAG': null
        }
        
        const user = await loginModel.authentication(data.email,data.password)

        if(!! user){
            statusCode = 202
            msg.status = 'logged'
            msg.loginTAG = loginModel.addTAG(user.id)
        }else{
            msg.status = 'authentication failed'
            statusCode = 400
        }

        res.status(statusCode).send(msg)        
    }



    static verifTAG(req,res){
        const userTAG = req.body.userTAG

        const validateTAG = loginModel.validateTAG(userTAG)

        const msg = {
            "verified": validateTAG
        }

        res.status(200).json(msg)
    }
    
}

export default loginController