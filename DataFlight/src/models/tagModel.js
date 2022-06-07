import GenerateCode from '../scripts/GenerateCode.js'

let tags = {}

class tagModel{
    static addTAG(userID){
        const newTAG = '#tag'+GenerateCode()

        tags[newTAG] = {
            "tag": newTAG,
            "userID": userID
        }

        return newTAG
    }

    static validateTAG(tag){
        if(tags[tag]) return true
        else return false
    }


}

export default tagModel