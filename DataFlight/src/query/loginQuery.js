import dbLOGIN from '../config/mysql_connection.js'
import GenerateCode from '../scripts/GenerateCode.js'

class loginQuery{
    static createUser(data){
        return new Promise( (resolve,reject) => {

            const cmd = `INSERT INTO users(id,displayName,email,Userpassword,photoURL) VALUES ('${GenerateCode()}','${data.displayName}','${data.email}','${data.password}','${data.photoURL}')`

            dbLOGIN.query(cmd, (err) => {
                resolve(!err)
            })
        })
    }

    static getUser(email=null,userID=null){
        return new Promise((resolve,reject) => {
            let cmd = ''
            if(email){
                cmd = `SELECT * FROM users WHERE email = '${email}'`
            }else if(userID){
                cmd = `SELECT * FROM users WHERE id = '${userID}'`
            }
            

            dbLOGIN.query(cmd, (err,results,fields) => {
                if(err) throw err;
                if(!!results[0]) resolve(results[0])
                else resolve(false)
            })
        })
    }


    static updateUser(data){
        return new Promise((resolve,reject) => {
            const cmd = `UPDATE users SET displayName='${data.displayName}', photoURL='${data.photoURL}' WHERE id = '${data.userID}'`

            dbLOGIN.query(cmd, (err) => {
                if(err) throw err
                resolve(!err)
            })
        })
    }

    static deleteUser(data){
        return new Promise((resolve,reject) => {
            const cmd = `DELETE FROM users WHERE id = '${data.userID}'`

            dbLOGIN.query(cmd, (err) => {
                if(err) throw err
                resolve(!err)
            })
        })
    }
}

export default loginQuery