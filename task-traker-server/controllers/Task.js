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

    const task = await Task.create({
      title,
      description,
      status,
      projectId,
    });
    console.log(task);
    // save task on project
    project.tasks.push(task._id);
    await project.save();
    // send response
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
      return res.status(404).json({ message: "Project not found t" });
    }
    const tasks = await Task.find({ projectId });

    res.status(200).json({
      status: false,
      message: "Projects found",
      data: tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Tasks find error found" });
  }
};

// Get specific task
const getSingleTask = async (req, res) => {
  const taskId = req.params.taskId;
  console.log(taskId);
  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({
      success: true,
      message: "Task Found",
      data: task,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching task", error: err.message });
  }
};

// Upadate Task
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  console.log(taskId);
  const { title, description, status, completedAt } = req.body;
  try {
    const project = await Task.findOne({ _id: taskId });
    if (!project) {
      return res.status(404).json({ message: "task not found" });
    }
    //  update task
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      { title, description, status, completedAt },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({
      success: true,
      message: "Task update successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  console.log(taskId);
  try {
    // Find task and delte task
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    // Remove the taskId from project tasks array
    await Project.findByIdAndUpdate(task.projectId, {
      $pull: { tasks: taskId },
    });

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching task", error: err.message });
  }
};

module.exports = {
  createTask,
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
