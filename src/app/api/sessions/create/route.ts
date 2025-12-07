import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../../../../lib/mongoose";
import SessionModel from "../../../../../models/SessionsModel";
import { generateRandomString } from "@/app/tools/generateRandomString";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectToDatabase();
    const { questions } = await req.json();
    if (!questions)
      return NextResponse.json(
        { error: "[questions] field wasn't provided" },
        { status: 400 }
      );
    const creatorToken = randomUUID();
    if (!creatorToken) {
      return NextResponse.json(
        { error: "Failed to generate creatorToken" },
        { status: 500 }
      );
    }
    const newSession = new SessionModel({
      questions,
      sessionCode: generateRandomString(5),
      started: false,
      ended: false,
      creatorToken,
    });

    await newSession.save();
    (await cookies()).set("session_creator_token", creatorToken);
    return NextResponse.json(
      { message: "Successfully created session" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
