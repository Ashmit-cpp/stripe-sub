import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req,res) {
  try {
    const { name, email, password } = await req.json();
    const plan = false;
    const hashedPassword = await bcrypt.hash(password, 10);//10 rounds of hashing
    await connectMongoDB();
    await User.create({ name, email, password: hashedPassword,plan }); //hashed password
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
