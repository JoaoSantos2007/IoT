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

        let statusCode = 500

        if(loginModel.validateTAG(userTAG)){
            const record = recordsModel.validateRecord(data)
            const created = await recordsQuery.createRecord(record)
        }
        
        res.status(200).send()
    }


    //Read all records
    static async getRecords(req,res){
        const userTAG = req.query.tag

        let statusCode = 500
        let records = null
        
        if(loginModel.validateTAG(userTAG)){
            records = await recordsQuery.getRecords()
            statusCode = 200
        }else{
            statusCode = 400
        }
        
        res.status(statusCode).send(records)
    }


    //Read specified record
    static async getSpecifiedRecord(req,res){
        const userTAG = req.query.tag
        const id = req.params.id

        let statusCode = 500
        let record
        
        if(loginModel.validateTAG(userTAG)){
            record = await recordsQuery.getRecords(id)
            statusCode = 200
        }else{
            statusCode = 400
        }
        
        res.status(statusCode).send(record)
    }


    //Update a record
    static async updateRecord(req,res){
        const data = req.body

        const record = recordsModel.validateRecord(data.record)
        const updated = await recordsQuery.updateRecord(data.id,record)

        res.status(200).send(updated)
    }


    //Delete a record
    static async deleteRecord(req,res){
        const userTAG = req.query.tag
        const id = req.params.id        

        let statusCode = 500

        if(loginModel.validateTAG(userTAG)){
            const deleted = await recordsQuery.deleteRecord(id)
            console.log(deleted)

            statusCode = 200
        }else{
            statusCode = 400
        }
        
        res.status(statusCode).send()
    }
}

export default recordsController