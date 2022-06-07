import loginModel from '../models/loginModel.js'
import tagModel from '../models/tagModel.js'
import loginQuery from '../query/loginQuery.js'

class loginController{

    constructor(){}

    static async loginAccount(req,res){
        const data = req.body

        let logged = false
        let tag = undefined
        

        const email = await loginQuery.getEmail(data.email)
        if(email){
            if(loginModel.authentication(email,data.password)){
                logged = true

                const newTAG = tagModel.addTAG(await loginQuery.getUserIDByEmail(email))

                tag = newTAG
            }
        }

        const msg = {
            'logged': logged,
            'loginTAG': tag
        }

        res.status(200).json(msg)
        
    }

    static async createAccount(req,res){
        const data = req.body

        //Check Email
        if(!loginModel.checkEmail(data.email)){
            res.status(400).status('Email incorrect!')
            return
        }
        
        //Verif Already email
        if(loginModel.verifEmail(data.email)){
            res.status(400).send('Account already exist!')
            return
        }

        const error = await loginQuery.createUser(data)
        if(!!error){
            res.status(200).send('Account created with Success!')
        }else{
            res.status(501).send('Failed!')
        }

    }
    
}

export default loginController