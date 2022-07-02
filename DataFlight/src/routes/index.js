import express from 'express'
import login from './loginRoutes.js'
import records from './recordsRoutes.js'

const routes = (app) => {
    app.route('/').get((req,res) => {
        res.status(200).send('API data flight')
    })

    app.use((req,res,next) => {
        res.set('Access-Control-Allow-Origin','*')
        res.set('Access-Control-Allow-Headers','*')
        next()
    })

    app.use(
        express.json(),
        login,
        records
    )
}

export default routes