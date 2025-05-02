
const express = require("express");
const router = express.Router();

const { createTask, getAllTask, getSingleTask, updateTask, deleteTask } = require("../controllers/Task");
const authMiddleware = require("../middleware/auth");

router.post("/:projectId", authMiddleware, createTask);
router.get("/:projectId", authMiddleware, getAllTask);
router.get("/single/:taskId", authMiddleware, getSingleTask);
router.put("/:taskId", authMiddleware, updateTask);
router.delete("/:taskId", authMiddleware, deleteTask);


module.exports = router;
