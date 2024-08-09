const mongoose = require("mongoose");

const createTask = new mongoose.Schema({
  todoName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  bookmark: {
    type: Boolean,
    default: false,
  },

  lastDate: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("Todo", createTask);
