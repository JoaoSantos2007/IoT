import loginModel from "../models/loginModel.js"
import recordsModel from "../models/recordsModel.js"
import recordsQuery from "../query/recordsQuery.js"

class recordsController{

    /*
    =======================================
                CRUD Operations
    =======================================
    */


    //Create a new record
    static async createRecords(req,res){
        const userTAG = req.query.tag
        const data = req.body

        let statusCode

        if(loginModel.validateTAG(userTAG)){
            const record = recordsModel.validateRecord(data)
            const created = await recordsQuery.createRecord(record)

            statusCode = created ? 200 : 500
        }else{
            statusCode = 400
        }
        
        res.status(statusCode).send()
    }


    //Read all records
    static async getRecords(req,res){
        const userTAG = req.query.tag

        let statusCode,records
        
        if(loginModel.validateTAG(userTAG)){
            records = await recordsQuery.getRecords()

            statusCode = records ? 200 : 500
        }else{
            statusCode = 400
        }
        
        res.status(statusCode).send(records)
    }


    //Read specified record
    static async getSpecifiedRecord(req,res){
        const userTAG = req.query.tag
        const id = req.params.id

        let statusCode,record
        
        if(loginModel.validateTAG(userTAG)){
            record = await recordsQuery.getRecords(id)

            statusCode = record ? 200 : 500
        }else{
            statusCode = 400
        }
        
        res.status(statusCode).send(record)
    }


    //Update a record
    static async updateRecord(req,res){
        const userTAG = req.query.tag
        const id = req.params.id
        const data = req.body

        let statusCode

        if(loginModel.validateTAG(userTAG)){
            const record = recordsModel.validateRecord(data)
            const updated = await recordsQuery.updateRecord(id,record)

            statusCode = updated ? 200 : 500
        }else{
            statusCode = 400
        }

        res.status(200).send()
    }


    //Delete a record
    static async deleteRecord(req,res){
        const userTAG = req.query.tag
        const id = req.params.id        

        let statusCode

        if(loginModel.validateTAG(userTAG)){
            const deleted = await recordsQuery.deleteRecord(id)

            statusCode = deleted ? 200 : 500
        }else{
            statusCode = 400
        }
        
        res.status(statusCode).send()
    }
}

export default recordsController