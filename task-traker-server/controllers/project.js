const Project = require("../models/Project");
const User = require("../models/User");

// Create Project
const createProject = async (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;

  // Validate title
  if (!title) {
    return res.status(400).json({ message: "Project title is required" });
  }

  try {
    // Check if the user already has 4 projects
    const projectCount = await Project.countDocuments({ userId });
    if (projectCount >= 4) {
      return res.status(400).json({
        message: "You can only create up to 4 projects",
      });
    }

    // Create a new project
    const newProject = await Project.create({
      title,
      userId,
    });

    res.status(201).json({
      message: "Project created successfully",
      data: newProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Project creation failed" });
  }
};

// Get all Projects
const getAllProjects = async (req, res) => {
  const userId = req.user.id;
  try {
    const projects = await Project.find({ userId });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

// delete Projects
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!project) return res.status(404).json({ message: "Project not found !" });

    // send response after delete
    res.status(200).json({
      success: true,
      message: "Succesfully Delete Project",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching projects",
      error: err.message,
    });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  deleteProject,
};
