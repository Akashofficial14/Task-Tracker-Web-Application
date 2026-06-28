import { axiosInstance } from "../config/axiosInstance";

// Fetch all tasks
export const getAllTasks = async () => {
    try {
        const res = await axiosInstance.get("/api/tasks/get");
        console.log("Tasks fetched successfully:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
        throw error; // Re-throw to be caught by useQuery
    }
};

// Create a new task
export const createTask = async (taskData) => {
    try {
        const res = await axiosInstance.post("/api/tasks/create", taskData);
        console.log("Task created successfully:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error creating task:", error.response?.data || error.message);
        throw error; // Re-throw to be caught by useMutation
    }
};

// Update an existing task
export const updateTask = async ({ taskId, updatedData }) => {
    try {
        const res = await axiosInstance.put(`/api/tasks/update/${taskId}`, updatedData);
        console.log("Task updated successfully:", res.data);
        return res.data;
    } catch (error) {
        console.error(`Error updating task ${taskId}:`, error.response?.data || error.message);
        throw error;
    }
};

// Delete a task
export const deleteTask = async (taskId) => {
    try {
        const res = await axiosInstance.delete(`/api/tasks/delete/${taskId}`);
        console.log("Task deleted successfully:", res.data);
        return res.data;
    } catch (error) {
        console.error(`Error deleting task ${taskId}:`, error.response?.data || error.message);
        throw error;
    }
};