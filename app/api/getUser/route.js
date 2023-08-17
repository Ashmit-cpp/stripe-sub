import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("search");
  await connectMongoDB();
  const user = await User.findOne({ email });
  console.log("userdocument: ", user);

  return new NextResponse(JSON.stringify({ user }));
}
