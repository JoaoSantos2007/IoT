import express from 'express'
import tagController from '../controllers/tagController.js'

const router = express.Router()

router
    .post('/tag',tagController.verifTAG)

export default router