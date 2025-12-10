import { NextRequest, NextResponse } from "next/server";
import AnswerModel from "../../../../models/AnswersModel";
import mongoose from "mongoose";
import connectToDatabase from "../../../../lib/mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { answers, sessionId } = await req.json();
    if (!sessionId || !answers || answers.length === 0) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      throw new Error("Invalid sessionId format");
    }

    const answersArray = (answers as string[]).map((answer, i) => ({
      _sessionId: new mongoose.Types.ObjectId(sessionId),
      questionIndex: i,
      answer,
    }));
    console.log(answersArray);
    await AnswerModel.insertMany(answersArray);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
