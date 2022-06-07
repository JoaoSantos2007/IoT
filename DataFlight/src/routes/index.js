import express from 'express'
import login from './loginRoutes.js'
import tags from './tagRoutes.js'

const routes = (app) => {
    app.route('/').get((req,res) => {
        res.status(200).send('API data flight')
    })

    app.use(
        express.json(),
        login,
        tags
    )
}

export default routes