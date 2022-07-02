import dbRECORDS from "../config/mongo_connection.js";
import { ObjectId } from "mongodb";

class recordsQuery{

    /*
    ===========================================
            MONGODB CRUD OPERATIONS
    ===========================================
    */


    //read a record
    static getRecords(id){
        return new Promise((resolve, reject) => {

            const filter = id ? {"_id": ObjectId(id)} : {}
            
            const results = dbRECORDS.collection("records").find(filter).toArray()
            resolve(results)
        })
    }

    //create a new record
    static createRecord(record){
        return new Promise((resolve,reject) => {
            dbRECORDS.collection("records").insertOne(record, (err) => {
                if(err) throw err

                resolve(!!err)
            })
        })
    }

    //update a record
    static updateRecord(id,record){
        const filter = {"_id": ObjectId(id)}
        const doc = {$set: record}

        return new Promise((resolve,reject) => {
            dbRECORDS.collection("records").updateOne(filter,doc,(err) => {
                if(err) throw err

                resolve(!!err)
            })
        })
    }

    //delete a record
    static deleteRecord(id){
        return new Promise((resolve, reject) => {
            const filter = {"_id": ObjectId(id)}

            dbRECORDS.collection("records").deleteOne(filter, (err) => {
                if(err) throw err
                
                resolve(!!err)
            })
        })
    }

}

export default recordsQuery