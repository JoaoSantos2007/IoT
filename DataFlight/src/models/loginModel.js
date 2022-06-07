import loginQuery from '../query/loginQuery.js'

class loginModel{
    constructor(){}

    //Check a valid Email
    static checkEmail(email){
        const re = /\S+@\S+\.\S+/
        const verifEmail = re.test(email)
        return verifEmail
    }

    //Verif Already email
    static async verifEmail(email){
        const existingEmail = await loginQuery.getEmail(email)

        if(existingEmail) return true

        return false
    }

    static async authentication(email,password){
        const user = await loginQuery.getUserByEmail(email)
        if(user.Userpassword == password){
            return true
        }
        return false
    }
}

export default loginModel