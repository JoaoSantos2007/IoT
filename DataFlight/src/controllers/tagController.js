import Tags from "../models/tagModel.js"

class tagController{

    //Create tag
    static createTags(req,res){
        const data = req.body

        Tags.create({
            "deviceID": data.deviceID,
            "tag": data.tag,
            "value": data.value
        })
        .then((tag) => {
            res.status(201).json({
                "created": true,
                "tag": tag
            })
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    }

    //Read tags
    static getTags(req,res){
        if(req.params.id){
            res.status(200).json(req.tag)
        }else{
            Tags.findAll()
            .then((tags) => {
                res.status(200).json(tags)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
        }
    }

    //Update tags
    static updateTags(req,res){
        const tag = req.tag
        const data = req.body
        
        tag.update({
            "deviceID": data.deviceID,
            "tag": data.tag,
            "value": data.value
        })
        .then((tag) => {
            res.status(200).json({
                "updated": true,
                "tag": tag
            })
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    }

    //Delete tags
    static deleteTags(req,res){
        const tag = req.tag

        tag.destroy()
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

export default tagController