import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const votesFilePath = path.join(process.cwd(), "data", "votes.json");

export async function POST(request: NextRequest) {
  try {
    const { stallName, participantId } = await request.json();

    if (!stallName || !participantId) {
      return NextResponse.json(
        { error: "Stall name and participant ID are required" },
        { status: 400 }
      );
    }

    // Read current votes
    const votesData = await fs.readFile(votesFilePath, "utf-8");
    const votes = JSON.parse(votesData);

    // Check if stall exists
    if (!(stallName in votes)) {
      return NextResponse.json({ error: "Stall not found" }, { status: 404 });
    }

    // Increment vote count
    votes[stallName] += 1;

    // Write back to file
    await fs.writeFile(votesFilePath, JSON.stringify(votes, null, 2));

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
    // Read current votes
    const votesData = await fs.readFile(votesFilePath, "utf-8");
    const votes = JSON.parse(votesData);

    return NextResponse.json(votes);
  } catch (error) {
    console.error("Error reading votes:", error);
    return NextResponse.json(
      { error: "Failed to read votes" },
      { status: 500 }
    );
  }
}
