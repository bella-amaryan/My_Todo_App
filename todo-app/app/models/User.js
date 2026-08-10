import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      trim: true,
      default: "",
    },
    language: {
  type: String,
  enum: ["en", "sv"],
  default: "en",
},

    bio: {
      type: String,
      default: "",
      maxlength: 250,
    },

    avatar: {
      type: String,
      default: "",
    },

    notifications: {
      enabled: {
        type: Boolean,
        default: true,
      },

      dailyReminder: {
        type: Boolean,
        default: true,
      },

      reminderTime: {
        type: String,
        default: "09:00",
      },

      dueToday: {
        type: Boolean,
        default: true,
      },

      overdueTasks: {
        type: Boolean,
        default: true,
      },

      weeklySummary: {
        type: Boolean,
        default: false,
      },

      sound: {
        type: Boolean,
        default: true,
      },
    },
  }, 

  {
    timestamps: true,
  }
);


const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;