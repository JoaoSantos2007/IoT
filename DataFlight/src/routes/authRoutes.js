import express from "express"
import authController from "../controllers/authController.js"
import authValidator from "../validation/authValidator.js"
const router = express.Router()

router
    .post("/login",authValidator.login(),authController.login)
    .post("/logout", authController.logout)

export default router