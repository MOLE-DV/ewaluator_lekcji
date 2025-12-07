import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  _sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  questionIndex: { type: Number, required: true },
  answer: { type: String, enum: ["yes", "no", "maybe"], required: true },
});

const AnswerModel =
  mongoose.models.Answers || mongoose.model("Answers", AnswerSchema);

export default AnswerModel;
