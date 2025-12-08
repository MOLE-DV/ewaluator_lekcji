import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../../../../lib/mongoose";
import AnswerModel from "../../../../../models/AnswersModel";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ _sessionId: string }> }
) {
  try {
    await connectToDatabase();
    const { _sessionId } = await params;
    if (!_sessionId) {
      return NextResponse.json(
        { message: "_sessionId is required to fetch session answers" },
        { status: 400 }
      );
    }
    if (!mongoose.isValidObjectId(_sessionId)) {
      return NextResponse.json(
        { message: "_sessionId format is invalid" },
        { status: 400 }
      );
    }
    let answers = await AnswerModel.find({
      _sessionId: new mongoose.Types.ObjectId(_sessionId),
    });
    return NextResponse.json({ answers });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export type AnswerType = {
  _id: string;
  _sessionId: string;
  questionIndex: number;
  answer: "yes" | "maybe" | "no";
};
