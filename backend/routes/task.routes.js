const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { createTask, getTasks, updateTask, deleteTask, updateTaskStatus } = require('../controllers/task.contoller');
const router = express.Router();

router.post("/create", authMiddleware, createTask);
router.get("/get", authMiddleware, getTasks);
router.put("/update/:taskId", authMiddleware, updateTask);
router.delete("/delete/:taskId", authMiddleware, deleteTask);
router.put("/update-status/:taskId",authMiddleware,updateTaskStatus)
module.exports = router;