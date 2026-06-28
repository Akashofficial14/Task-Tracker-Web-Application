const taskModel = require("../models/task.model");

// Create Task
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id; // From authMiddleware

        if (!title || !description) return res.status(400).json({ message: "Title and description required" });

        const newTask = await taskModel.create({ title, description, userId });
        res.status(201).json({ success: true, task: newTask });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

// Get All Tasks for a specific user
const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find({ userId: req.user.id });
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

// Update Task
const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const updatedTask = await taskModel.findOneAndUpdate(
            { _id: taskId, userId: req.user.id },
            req.body,
            { new: true }
        );
        if (!updatedTask) return res.status(404).json({ message: "Task not found" });
        res.status(200).json({ success: true, updatedTask });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

// Delete Task
const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const deletedTask = await taskModel.findOneAndDelete({ _id: taskId, userId: req.user.id });
        if (!deletedTask) return res.status(404).json({ message: "Task not found" });
        res.status(200).json({ success: true, message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

const updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params; // The task ID from the URL
        const { status } = req.body; // The new status

        // 1. Validate that the status is one of the allowed values
        const allowedStatuses = ["pending", "in-progress", "completed"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }

        // 2. Find and update the task
        // We ensure the userId matches the logged-in user so they can't update others' tasks
        const updatedTask = await taskModel.findOneAndUpdate(
            { _id: taskId, userId: req.user._id }, 
            { status: status },
            { new: true } // Returns the updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ success: false, message: "Task not found or unauthorized" });
        }

        res.status(200).json({
            success: true,
            message: "Task status updated successfully",
            task: updatedTask
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


module.exports = { createTask, getTasks, updateTask, deleteTask, updateTaskStatus };