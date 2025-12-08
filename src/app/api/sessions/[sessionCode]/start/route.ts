import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../../../../../lib/mongoose";
import SessionModel from "../../../../../../models/SessionsModel";

export async function POST(
  req: NextRequest,
  { params }: { params: { sessionCode: string } }
) {
  try {
    await connectToDatabase();
    const { sessionCode } = await params;
    await SessionModel.updateOne({ sessionCode }, { $set: { started: true } });
    return NextResponse.json(
      { message: "Successfully changed session state" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
