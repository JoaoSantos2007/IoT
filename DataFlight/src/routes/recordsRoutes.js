import express from 'express'
import recordsController from '../controllers/recordsController.js'

const router = express.Router()

router
    .get('/records',recordsController.getRecords)
    .get('/records/:id',recordsController.getSpecifiedRecord)
    .post('/records',recordsController.createRecords)
    .put('/records',recordsController.updateRecord)
    .delete('/records/:id',recordsController.deleteRecord)

export default router