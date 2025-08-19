import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

// Initialize with default values for all stalls
const initializeVotes = async () => {
  const stallNames = [
    "Bowled Over!",
    "Bengaluru Traffic Exit Squad",
    "Fire & Fly: Sparking Duos, Taking Flight",
    "Doodle Dystopia",
    "Five Naans",
    "Peas in a Pod",
    "Knot Happening",
    "Red Light Green Light",
    "The Lucky Rollers",
    "Decodables",
    "Brush and Bloom",
    "Beat 50 in 60",
    "Ctrl+Alt+Delight",
    "MazeMaven",
    "404 Not Found",
  ];

  // Check if votes exist in KV, if not initialize with 0
  const existingVotes = await kv.get("votes");
  if (!existingVotes) {
    const initialVotes: { [key: string]: number } = {};
    stallNames.forEach((name) => {
      initialVotes[name] = 0;
    });
    await kv.set("votes", initialVotes);
  }
};

export async function POST(request: NextRequest) {
  try {
    const { stallName, participantId } = await request.json();

    if (!stallName || !participantId) {
      return NextResponse.json(
        { error: "Stall name and participant ID are required" },
        { status: 400 }
      );
    }

    // Initialize votes if needed
    await initializeVotes();

    // Get current votes from KV
    const votes = await kv.get("votes") as { [key: string]: number } || {};

    // Check if stall exists
    if (!(stallName in votes)) {
      return NextResponse.json({ error: "Stall not found" }, { status: 404 });
    }

    // Increment vote count
    votes[stallName] += 1;

    // Save updated votes back to KV
    await kv.set("votes", votes);

    return NextResponse.json({
      success: true,
      stallName,
      newVoteCount: votes[stallName],
    });
  } catch (error) {
    console.error("Error processing vote:", error);
    return NextResponse.json(
      { error: "Failed to process vote" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Initialize votes if needed
    await initializeVotes();
    
    // Get votes from KV
    const votes = await kv.get("votes") as { [key: string]: number } || {};
    return NextResponse.json(votes);
  } catch (error) {
    console.error("Error reading votes:", error);
    return NextResponse.json(
      { error: "Failed to read votes" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    // Reset all votes to 0
    const stallNames = [
      "Bowled Over!",
      "Bengaluru Traffic Exit Squad",
      "Fire & Fly: Sparking Duos, Taking Flight",
      "Doodle Dystopia",
      "Five Naans",
      "Peas in a Pod",
      "Knot Happening",
      "Red Light Green Light",
      "The Lucky Rollers",
      "Decodables",
      "Brush and Bloom",
      "Beat 50 in 60",
      "Ctrl+Alt+Delight",
      "MazeMaven",
      "404 Not Found",
    ];

    const resetVotes: { [key: string]: number } = {};
    stallNames.forEach((name) => {
      resetVotes[name] = 0;
    });

    // Save reset votes to KV
    await kv.set("votes", resetVotes);

    return NextResponse.json({
      success: true,
      message: "All votes have been reset to 0",
    });
  } catch (error) {
    console.error("Error resetting votes:", error);
    return NextResponse.json(
      { error: "Failed to reset votes" },
      { status: 500 }
    );
  }
}
