import express from 'express'
import eventController from '../controllers/eventController.js'

const router = express.Router()

router
    .get("/events", eventController.readEvent)
    .post("/events", eventController.createEvent)

export default router