import express from 'express'
import loginController from '../controllers/loginController.js'

const router = express.Router()

router
    .post('/user', loginController.createUser)
    .get('/user',loginController.getUser)
    .put('/user',loginController.updateUser)
    .delete('/user',loginController.deleteUser)

    .post('/login', loginController.loginAccount)
    .get('/tag',loginController.verifTAG)
    


export default router