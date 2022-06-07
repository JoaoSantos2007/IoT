import express from 'express'
import loginController from '../controllers/loginController.js'

const router = express.Router()

router
    .post('/login', loginController.loginAccount)
    .put('/login', loginController.createAccount)

export default router