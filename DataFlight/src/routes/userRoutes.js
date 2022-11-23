import express from 'express'
import userController from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import userValidator from '../validation/userValidator.js'

const router = express.Router()

router
    .get("/user",authMiddleware.verifToken,userController.readUser)
    .post("/user",userValidator.post(),userController.createUser)
    .put("/user",authMiddleware.verifToken,userValidator.put(),userController.updateUser)
    .delete("/user",authMiddleware.verifToken,userController.deleteUser)

export default router