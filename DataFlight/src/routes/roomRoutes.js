import express from 'express'
import roomController from '../controllers/roomController.js'
import roomValidator from '../validation/roomValidator.js'

const Router = express.Router()

Router
    .get("/rooms",roomController.getRooms)
    .get("/rooms/:id",roomValidator.getRoom(),roomController.getRoomsByID)
    .post("/rooms",roomValidator.postRoom(),roomController.createRoom)
    .put("/rooms/:id",roomValidator.putRoom(),roomController.updateRoom)
    .delete("/rooms/:id",roomValidator.deleteRoom(),roomController.deleteRoom)

export default Router