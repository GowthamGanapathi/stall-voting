"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StallCard from "@/components/StallCard";

interface Stall {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  votes: number;
}

// Sample stalls data - you can update these tomorrow with real details
const sampleStalls: Stall[] = [
  {
    _id: "1",
    name: "Bowled Over!",
    description: "",
    imageUrl: "/images/bowled-over.jpg",
    category: "Technology",
    votes: 0,
  },
  {
    _id: "2",
    name: "Bounce Master",
    description: "",
    imageUrl: "/images/bengaluru-traffic.jpg",
    category: "Food & Beverage",
    votes: 0,
  },
  {
    _id: "3",
    name: "Fire & Fly: Sparking Duos, Taking Flight",
    description: "",
    imageUrl: "/images/fire-fly.jpg",
    category: "Arts & Crafts",
    votes: 0,
  },
  {
    _id: "4",
    name: "Doodle Dystopia",
    description: "",
    imageUrl: "/images/doodle-dystopia.jpg",
    category: "Health & Wellness",
    votes: 0,
  },
  {
    _id: "5",
    name: "Five Naans",
    description: "",
    imageUrl: "/images/five-naans.jpg",
    category: "Entertainment",
    votes: 0,
  },
  {
    _id: "6",
    name: "Peas in a Pod",
    description: "",
    imageUrl: "/images/peas-in-a-pod.jpg",
    category: "Environment",
    votes: 0,
  },
  {
    _id: "7",
    name: "Knot Happening",
    description: "",
    imageUrl: "/images/knot-happening.jpg",
    category: "Sports & Fitness",
    votes: 0,
  },
  {
    _id: "8",
    name: "Red Light Green Light",
    description: "",
    imageUrl: "/images/red-light-green-light.jpg",
    category: "Education",
    votes: 0,
  },
  {
    _id: "9",
    name: "The Lucky Rollers",
    description: "",
    imageUrl: "/images/lucky-rollers.jpg",
    category: "Entertainment",
    votes: 0,
  },
  {
    _id: "10",
    name: "Decodables",
    description: "",
    imageUrl: "/images/decodables.jpg",
    category: "Arts & Media",
    votes: 0,
  },
  {
    _id: "11",
    name: "Brush and Bloom",
    description: "",
    imageUrl: "/images/brush-bloom.jpg",
    category: "Arts & Crafts",
    votes: 0,
  },
  {
    _id: "12",
    name: "Beat 50 in 60",
    description: "",
    imageUrl: "/images/beat-50-60.jpg",
    category: "Education",
    votes: 0,
  },
  {
    _id: "13",
    name: "Ctrl+Alt+Delight",
    description: "",
    imageUrl: "/images/ctrl-alt-delight.jpg",
    category: "Health & Wellness",
    votes: 0,
  },
  {
    _id: "14",
    name: "MazeMaven",
    description: "",
    imageUrl: "/images/mazemaven.jpg",
    category: "Education",
    votes: 0,
  },
  {
    _id: "15",
    name: "404 Not Found",
    description: "",
    imageUrl: "/images/404-not-found.jpg",
    category: "Business",
    votes: 0,
  },
];

export default function Home() {
  const [stalls, setStalls] = useState<Stall[]>(sampleStalls);
  const [participantId] = useState(
    `participant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );

  // Shuffle stalls after each vote
  const shuffleStalls = () => {
    setStalls((prevStalls) => {
      const shuffled = [...prevStalls];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  // Load vote counts on page load
  useEffect(() => {
    loadVoteCounts();
  }, []);

  const loadVoteCounts = async () => {
    try {
      const response = await fetch("/api/vote");
      if (response.ok) {
        const voteCounts = await response.json();

        // Update stalls with current vote counts
        setStalls((prevStalls) =>
          prevStalls.map((stall) => ({
            ...stall,
            votes: voteCounts[stall.name] || 0,
          }))
        );
      }
    } catch (error) {
      console.error("Error loading vote counts:", error);
    }
  };

  const handleVote = async (stallId: string) => {
    const stall = stalls.find((s) => s._id === stallId);
    if (!stall) return;

    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stallName: stall.name,
          participantId: participantId,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        // Update local state
        setStalls((prevStalls) =>
          prevStalls.map((s) =>
            s._id === stallId ? { ...s, votes: result.newVoteCount } : s
          )
        );

        // Show success message first, then shuffle after delay
        setTimeout(() => {
          shuffleStalls();
        }, 2000); // Wait 2 seconds before shuffling
      } else {
        const error = await response.json();
        alert(error.error || "Voting failed");
      }
    } catch (error) {
      console.error("Error voting:", error);
      alert("Voting failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-y-auto">
      {/* Main Content */}
      <main className="min-h-screen px-4 pt-4 pb-6">
        {/* Header Section with Logo Space and Catchy Text */}
        <div className="text-center mb-4">
          {/* Logo Space */}
          <div className="mb-2">
            <div className="w-52 h-52 mx-auto flex items-center justify-center">
              <img
                src="/images/the-great-escape-logo.png"
                alt="THE GREAT ESCAPE"
                className="w-full h-full object-contain drop-shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='208' height='208' viewBox='0 0 208 208'%3E%3Crect width='208' height='208' fill='%23f3f4f6'/%3E%3Ctext x='104' y='117' font-family='Arial' font-size='20' fill='%236b7280' text-anchor='middle' dominant-baseline='middle'%3ETHE GREAT ESCAPE%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>

          {/* Main Title and Catchy Text */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            VOTE FOR YOUR FAVOURITE STALL!
          </h1>
          <p className="text-base text-gray-600 mb-1">
            Choose the one that impressed you most!
          </p>
        </div>

        {/* Stalls Grid - 5 stalls per row for optimal page filling */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {stalls.map((stall, index) => (
            <motion.div
              key={stall._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <StallCard stall={stall} onVote={handleVote} />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
