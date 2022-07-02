import loginQuery from '../query/loginQuery.js'
import GenerateCode from '../scripts/GenerateCode.js'

let tags = {}

tags['#teste'] = {
    'tag':'#teste',
    'userID':'NeBgLXw2LHvFWPbbdbP43iv2I'
}

class loginModel{


    /*
    ========================================
                 Validate Email
    ========================================
    */

    //Check a valid Email
    static checkEmail(email){
        const re = /\S+@\S+\.\S+/
        const verifEmail = re.test(email)
        return verifEmail
    }

    //Verif Already email
    static async verifEmail(email){
        const existingEmail = await loginQuery.getUser(email)
        return !existingEmail
    }

    static async validateEmail(email){
        return loginModel.checkEmail(email) && loginModel.verifEmail(email)
    }


    /*
    ========================================
                TAG functions
    ========================================
    */

    //Create a tag
    static addTAG(userID){
        const newTAG = '#tag'+GenerateCode()

        tags[newTAG] = {
            "tag": newTAG,
            "userID": userID
        }

        return newTAG
    }

    //Validate a tag
    static validateTAG(tag){
        if(!tag.startsWith('#')){
            tag = '#' + tag
        }
        return !!tags[tag]
    }

    //Get a tag by user ID
    static getTAG(userID){
        for(const index in tags){
            if(tags[index].userID == userID){
                return tags[index].tag
            }
        }
    }

    //Get user ID by a tag
    static getUserID(tag){
        return tags[tag].userID
    }

    static verifExistingTAG(userID){
        const existingTAG = loginModel.getTAG(userID)
        
        if(!! existingTAG){
            loginModel.deleteTAG(existingTAG)
        }
    }

    //Delete Tag
    static deleteTAG(tag){
        delete tags[tag]
    }


    /*
    ========================================
                Authentication
    ========================================
    */

    static async authentication(email,password){
        const user = await loginQuery.getUser(email)
        if(!!user && user.Userpassword == password){
            return user
        }else{
            return false
        }
               
    }


}

export default loginModel