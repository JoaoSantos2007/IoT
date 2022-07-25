import dbRECORDS from "../config/mongo_connection.js";
import { ObjectId } from "mongodb";

const recordCollection = dbRECORDS.collection("records")

class recordsQuery{

    /*
    ===========================================
            MONGODB CRUD OPERATIONS
    ===========================================
    */

    
    //create a new record
    static createRecord(record){
        return new Promise((resolve,reject) => {
            const results = recordCollection.insertOne(record).catch()
            resolve(results)
        })
    }

    //read a record
    static getRecords(id){
        return new Promise((resolve, reject) => {
            const filter = id ? {"_id": ObjectId(id)} : {}
            
            const results = recordCollection.find(filter).toArray()
            resolve(results)
        })
    }

    //update a record
    static updateRecord(id,record){
        const filter = {"_id": ObjectId(id)}
        const doc = {$set: record}

        return new Promise((resolve,reject) => {
            const results = recordCollection.updateOne(filter,doc).catch()
            resolve(results)
        })
    }

    //delete a record
    static deleteRecord(id){
        return new Promise((resolve, reject) => {
            const filter = {"_id": ObjectId(id)}

            const results = recordCollection.deleteOne(filter).catch()
            resolve(results)
        })
    }

}

export default recordsQuery