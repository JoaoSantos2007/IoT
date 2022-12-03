import express from 'express'
import routes from './routes/index.js'
import "./config/mysql.js"
import "./fast/fast.js"

//Express
const app = express()
routes(app)

export default app