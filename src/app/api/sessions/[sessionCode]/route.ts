import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../../../../lib/mongoose";
import SessionModel from "../../../../../models/SessionsModel";
import { cookies } from "next/headers";
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionCode: string }> }
) {
  try {
    await connectToDatabase();
    const { sessionCode } = await params;
    const session = await SessionModel.findOne({ sessionCode });
    let isHost = false;
    if (session) {
      const cookie = (await cookies()).get("session_creator_token");
      const creatorToken = cookie?.value ?? null;

      isHost = Boolean(
        creatorToken &&
          session.creatorToken &&
          creatorToken === session.creatorToken
      );
    }
    return NextResponse.json({
      session,
      isHost,
    });
  } catch (error) {
    console.error("Error in GET /api/sessions/[sessionId]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export type SessionType = {
  _id: string;
  questions: string[];
  sessionCode: string;
  started: boolean;
  ended: boolean;
  creatorToken: string;
  createdAt: Date;
  updatedAt: Date;
};
