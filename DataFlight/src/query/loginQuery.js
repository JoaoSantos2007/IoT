import dbLOGIN from '../config/mysql_connection.js'
import GenerateCode from '../scripts/GenerateCode.js'

class loginQuery{
    constructor(){}

    static getEmails(){
        return new Promise(function(resolve, reject) {
            dbLOGIN.query('SELECT email FROM users', function  (err,results,fields){
                if(err) throw err;

                let data = []

                results.forEach(row => {
                    data.push(row.email)
                })

                resolve(data)
            })
        });
    }

    static getEmail(email){
       return new Promise(function(resolve, reject) {
           const cmd = `SELECT email FROM users WHERE email = '${email}'`

           dbLOGIN.query(cmd, (err,results,fields) => {
               if(err) throw err;

               let data = []

               results.forEach(row => {
                   data.push(row.email)
               })

               resolve(data[0])
           })
       }) 
    }

    static getUsers(){
        return new Promise( (resolve,reject) => {
            const cmd = 'SELECT * FROM users;'
            dbLOGIN.query(cmd,(err,results,fields) => {
                if(err) throw err;

                let data = []

                results.forEach(row => {
                    data.push(row)
                })

                resolve(data)
            })
            
        })
    }

    static getUserByEmail(email){
        return new Promise((resolve,reject) => {
            const cmd = `SELECT * FROM users WHERE email = '${email}'`

            dbLOGIN.query(cmd, (err,results,fields) => {
                if(err) throw err;

                let data = []

                results.forEach(row => {
                    data.push(row)
                })

                resolve(data[0])
            })
        })
    }

    static getUserIDByEmail(email){
        return new Promise( (resolve,reject) => {
            const cmd = `SELECT id FROM users WHERE email = '${email}'`

            dbLOGIN.query(cmd, (err,results,fields) => {
                if(err) throw err;

                let data = []

                results.forEach(row => {
                    data.push(row.id)
                })

                resolve(data[0])
            })
        })
    }

    static createUser(data){
        return new Promise( (resolve,reject) => {

            const cmd = `INSERT INTO users(id,displayName,email,Userpassword,photoURL) VALUES ('${GenerateCode()}','','${data.email}','${data.password}','${data.photoURL}')`

            dbLOGIN.query(cmd, (err) => {
                resolve(err)
            })
        })
    }
}

export default loginQuery