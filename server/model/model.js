const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
  timeStamp: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("todo", UserSchema);
module.exports = model;
