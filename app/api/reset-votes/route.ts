import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

// Fallback in-memory storage for development
let fallbackVotes: { [key: string]: number } = {};

export async function POST() {
  try {
    console.log("Reset votes API called");

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

    console.log("Attempting to reset votes in KV...");

    try {
      // Try to use Vercel KV
      await kv.set("votes", resetVotes);
      console.log("Votes reset successfully in KV");
    } catch (kvError) {
      // Fallback to in-memory storage
      console.log("Using fallback storage due to KV error:", kvError);
      fallbackVotes = resetVotes;
      console.log("Votes reset successfully in fallback storage");
    }

    console.log("Reset operation completed successfully");

    return NextResponse.json({
      success: true,
      message: "All votes have been reset to 0",
    });
  } catch (error) {
    console.error("Error in reset-votes API:", error);
    return NextResponse.json(
      { error: "Failed to reset votes" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log("Reset-votes API GET method called");
    return NextResponse.json({
      message: "Reset-votes API is working",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in reset-votes GET:", error);
    return NextResponse.json(
      { error: "Failed to get reset-votes status" },
      { status: 500 }
    );
  }
}
