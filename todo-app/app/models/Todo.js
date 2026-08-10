
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  completed: {
  type: Boolean,
  default: false,
},
  
   completedAt:{
        type:Date,
        default:null
    },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Low",
  },

  category: {
    type: String,
    enum: ["Work", "Personal", "Study", "General","Fitness"],
    default: "General",
  },

  dueDate: {
    type: Date,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});



const Todo =
  mongoose.models.Todo ||
  mongoose.model("Todo", todoSchema);

export default Todo;