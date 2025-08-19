import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Stall from "@/models/Stall";

export async function GET() {
  try {
    await connectDB();
    const stalls = await Stall.find({}).sort({ votes: -1 });
    return NextResponse.json(stalls);
  } catch (error) {
    console.error("Error fetching stalls:", error);
    return NextResponse.json(
      { error: "Failed to fetch stalls" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await connectDB();

    const stall = new Stall(body);
    await stall.save();

    return NextResponse.json(stall, { status: 201 });
  } catch (error) {
    console.error("Error creating stall:", error);
    return NextResponse.json(
      { error: "Failed to create stall" },
      { status: 500 }
    );
  }
}
