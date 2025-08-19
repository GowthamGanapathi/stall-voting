import { NextRequest, NextResponse } from "next/server";

// In-memory storage for votes (will reset on server restart)
const votes = new Map<string, number>();

// Initialize with default values for all stalls
const initializeVotes = () => {
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
    "404 Not Found"
  ];
  
  stallNames.forEach(name => {
    if (!votes.has(name)) {
      votes.set(name, 0);
    }
  });
};

// Initialize votes on first request
if (votes.size === 0) {
  initializeVotes();
}

export async function POST(request: NextRequest) {
  try {
    const { stallName, participantId } = await request.json();

    if (!stallName || !participantId) {
      return NextResponse.json(
        { error: "Stall name and participant ID are required" },
        { status: 400 }
      );
    }

    // Check if stall exists
    if (!votes.has(stallName)) {
      return NextResponse.json({ error: "Stall not found" }, { status: 404 });
    }

    // Increment vote count
    const currentVotes = votes.get(stallName) || 0;
    votes.set(stallName, currentVotes + 1);

    return NextResponse.json({
      success: true,
      stallName,
      newVoteCount: votes.get(stallName),
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
    // Convert Map to object for JSON response
    const votesObject = Object.fromEntries(votes);
    return NextResponse.json(votesObject);
  } catch (error) {
    console.error("Error reading votes:", error);
    return NextResponse.json(
      { error: "Failed to read votes" },
      { status: 500 }
    );
  }
}
