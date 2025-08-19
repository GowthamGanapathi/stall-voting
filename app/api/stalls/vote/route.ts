import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Stall from "@/models/Stall";

export async function POST(request: NextRequest) {
  try {
    const { stallId, participantId } = await request.json();

    if (!stallId || !participantId) {
      return NextResponse.json(
        { error: "Stall ID and participant ID are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if participant has already voted
    const existingVote = await Stall.findOne({
      _id: stallId,
      participants: participantId,
    });

    if (existingVote) {
      return NextResponse.json(
        { error: "You have already voted for this stall" },
        { status: 400 }
      );
    }

    // Remove participant's previous vote from any stall
    await Stall.updateMany(
      { participants: participantId },
      {
        $pull: { participants: participantId },
        $inc: { votes: -1 },
      }
    );

    // Add vote to selected stall
    const updatedStall = await Stall.findByIdAndUpdate(
      stallId,
      {
        $inc: { votes: 1 },
        $push: { participants: participantId },
      },
      { new: true }
    );

    if (!updatedStall) {
      return NextResponse.json({ error: "Stall not found" }, { status: 404 });
    }

    return NextResponse.json(updatedStall);
  } catch (error) {
    console.error("Error voting:", error);
    return NextResponse.json(
      { error: "Failed to process vote" },
      { status: 500 }
    );
  }
}
