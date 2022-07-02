import mongodb from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const URL = process.env.MONGO_URL

const conn = new mongodb.MongoClient(URL);
await conn.connect()

const dbRECORDS = conn.db("IOTDB")

if(dbRECORDS.databaseName == 'IOTDB') console.log('Connection established with MONGODB!')

export default dbRECORDS