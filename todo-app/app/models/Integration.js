import mongoose from "mongoose";

const IntegrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    provider: {
      type: String,
      enum: ["google"],
      required: true,
    },

    providerId: String,

    email: String,

    accessToken: String,

    refreshToken: String,

    connected: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Integration ||
  mongoose.model("Integration", IntegrationSchema);