import { NextRequest, NextResponse } from "next/server";
import AnswerModel from "../../../../models/AnswersModel";
import mongoose from "mongoose";
import connectToDatabase from "../../../../lib/mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { answer, questionIndex, sessionId } = await req.json();

    if (!sessionId || typeof questionIndex !== "number" || !answer) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      throw new Error("Invalid sessionId format");
    }
    const newAnswer = new AnswerModel({
      _sessionId: new mongoose.Types.ObjectId(sessionId),
      questionIndex,
      answer,
    });

    await newAnswer.save();

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
