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
        return !! tags[tag]
    }

    static getTAG(userID){
        for(const index in tags){
            if(tags[index].userID == userID){
                return tags[index].tag
            }
        }
    }

    static deleteTAG(tag){
        delete tags[tag]
    }


}

export default tagModel