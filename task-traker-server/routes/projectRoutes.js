const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
  deleteProject,
} = require("../controllers/project");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getAllProjects);
router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;
