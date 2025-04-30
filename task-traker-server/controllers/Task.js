const Project = require("../models/Project");
const Task = require("../models/Task");

const createTask = async (req, res) => {
  const { projectId } = req.params;
  const { title, description, status } = req.body;

  try {
    // Validate that project exists and belongs to the user.
    const project = await Project.findOne({
      _id: projectId,
      userId: req.user.id,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const task = new Task({ title, description, status, projectId });
    await task.save();
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET all tasks for a specific project
const getAllTask = async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const tasks = await Task.find({ projectId });

    res.status(200).json({
      status: false,
      message: "Project not found",
      data: tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Upadate Task
const updateTask = async (req, res) => {
  const { taksId } = req.params;
  const { title, description, status, completedAt } = req.body;
  try {
    const project = await Project.findOne({ _id: taksId });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    //  update task
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taksId },
      { title, description, status, completedAt },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({
      success: true,
      data: updateTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
