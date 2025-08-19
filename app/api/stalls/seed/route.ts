import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Stall from "@/models/Stall";

const sampleStalls = [
  {
    name: "Tech Innovation Hub",
    description:
      "Cutting-edge technology demonstrations and interactive experiences",
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    category: "Technology",
  },
  {
    name: "Culinary Delights",
    description:
      "Exotic cuisines and gourmet food tastings from around the world",
    imageUrl:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    category: "Food & Beverage",
  },
  {
    name: "Art & Craft Corner",
    description: "Creative workshops and handmade crafts by talented artists",
    imageUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8a?w=400&h=300&fit=crop",
    category: "Arts & Crafts",
  },
  {
    name: "Wellness Zone",
    description: "Relaxation techniques, meditation, and health consultations",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    category: "Health & Wellness",
  },
  {
    name: "Gaming Arena",
    description: "Latest video games, VR experiences, and gaming competitions",
    imageUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    category: "Entertainment",
  },
  {
    name: "Green Thumb Garden",
    description: "Sustainable gardening tips and plant care workshops",
    imageUrl:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    category: "Environment",
  },
  {
    name: "Fitness Challenge",
    description: "Fun fitness activities and workout challenges",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    category: "Sports & Fitness",
  },
  {
    name: "Bookworm's Paradise",
    description: "Book exchange, reading sessions, and literary discussions",
    imageUrl:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    category: "Education",
  },
  {
    name: "Music & Dance",
    description: "Live performances, karaoke, and dance workshops",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    category: "Entertainment",
  },
  {
    name: "Photography Studio",
    description: "Photo booths, portrait sessions, and photography tips",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
    category: "Arts & Media",
  },
  {
    name: "DIY Workshop",
    description: "Hands-on DIY projects and creative building activities",
    imageUrl:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    category: "Arts & Crafts",
  },
  {
    name: "Science Lab",
    description: "Interactive experiments and scientific demonstrations",
    imageUrl:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop",
    category: "Education",
  },
  {
    name: "Pet Corner",
    description: "Pet therapy sessions and animal care workshops",
    imageUrl:
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop",
    category: "Health & Wellness",
  },
  {
    name: "Travel & Culture",
    description: "Cultural presentations and travel planning tips",
    imageUrl:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
    category: "Education",
  },
  {
    name: "Innovation Station",
    description:
      "Startup ideas, innovation challenges, and brainstorming sessions",
    imageUrl:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
    category: "Business",
  },
];

export async function POST() {
  try {
    await connectDB();

    // Clear existing stalls
    await Stall.deleteMany({});

    // Insert sample stalls
    const stalls = await Stall.insertMany(sampleStalls);

    return NextResponse.json({
      message: "Database seeded successfully",
      count: stalls.length,
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
