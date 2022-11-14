import express from 'express'
import deviceController from '../controllers/deviceController.js'
import deviceValidator from '../validation/deviceValidator.js'

const Router = express.Router()

Router
    .get("/devices",deviceController.getDevices)
    .get("/devices/:id",deviceValidator.getDevice(),deviceController.getDevices)
    .post("/devices",deviceValidator.postDevice(),deviceController.createDevice)
    .put("/devices/:id",deviceValidator.putDevice(),deviceController.updateDevice)
    .delete("/devices/:id",deviceValidator.deleteDevice(),deviceController.deleteDevice)

export default Router