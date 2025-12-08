import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    questions: { type: Array, required: true },
    sessionCode: { type: String, required: true },
    started: { type: Boolean, required: true },
    ended: { type: Boolean, required: true },
    creatorToken: { type: String, required: true },
  },
  { timestamps: true }
);

SessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

const SessionModel =
  mongoose.models.Sessions || mongoose.model("Sessions", SessionSchema);

export default SessionModel;
