const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authusers", // Must match the name in your userModel
        required: true,
    }
}, {
    timestamps: true,
});

const taskModel = mongoose.model("tasks", taskSchema);
module.exports = taskModel;