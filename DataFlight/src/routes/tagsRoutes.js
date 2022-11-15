import express from "express"
import tagController from "../controllers/tagController.js"
import tagValidator from "../validation/tagValidator.js"

const router = express.Router()

router
    .get("/tags",tagController.getTags)
    .get("/tags/:id",tagValidator.getTag(),tagController.getTags)
    .post("/tags",tagValidator.postTag(),tagController.createTags)
    .put("/tags/:id",tagValidator.putTag(),tagController.updateTags)
    .delete("/tags/:id",tagValidator.deleteTag(),tagController.deleteTags)

export default router