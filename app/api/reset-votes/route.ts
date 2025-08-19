import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

// Fallback in-memory storage for development
let fallbackVotes: { [key: string]: number } = {};

export async function POST() {
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

    try {
      // Try to use Vercel KV
      await kv.set("votes", resetVotes);
    } catch (kvError) {
      // Fallback to in-memory storage
      console.log("Using fallback storage due to KV error:", kvError);
      fallbackVotes = resetVotes;
    }

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
