import tagModel from "../models/tagModel.js"

class tagController{
    
    static verifTAG(req,res){
        const userTAG = req.body.userTAG

        const validateTAG = tagModel.validateTAG(userTAG)

        const msg = {
            "verified": validateTAG
        }

        res.status(200).json(msg)
    }
}

export default tagController