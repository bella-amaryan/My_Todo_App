
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
   todoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo",
    required: false,
  },

  title: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: [
     "DAILY_REMINDER",
    "TASK_CREATED",
    "TASK_COMPLETED",
    "TASK_DUE",
    "TASK_OVERDUE",
    "WEEKLY_SUMMARY",
    "SYSTEM",
    ],
    default: "SYSTEM",
  },

  isRead: {
    type: Boolean,
    default: false,
  },
},

{
    timestamps:true,
},
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);

export default Notification;