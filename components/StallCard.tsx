"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Vote } from "lucide-react";

interface StallCardProps {
  stall: {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    votes: number;
  };
  onVote: (stallId: string) => void;
}

export default function StallCard({ stall, onVote }: StallCardProps) {
  const [isVoting, setIsVoting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleVote = async () => {
    setIsVoting(true);

    try {
      await onVote(stall._id);
      setShowSuccess(true);

      // Hide success message after 1.5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 1500);
    } catch (error) {
      console.error("Vote failed:", error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <>
      {/* Main Stall Card */}
      <motion.div
        className="stall-card group relative overflow-hidden h-full"
        whileHover={{
          scale: 1.02,
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Hover Overlay */}
        <motion.div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-lg">
          <motion.img
            src={stall.imageUrl}
            alt={stall.name}
            className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='200' y='150' font-family='Arial' font-size='16' fill='%236b7280' text-anchor='middle' dominant-baseline='middle'%3E${stall.name}%3C/text%3E%3C/svg%3E";
            }}
          />

          {/* Category Badge */}
          <motion.div
            className="absolute top-1 left-1 px-1.5 py-0.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700"
            initial={{ opacity: 0, y: -10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {stall.category}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-2">
          <motion.h3 className="text-base font-bold text-center mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
            {stall.name}
          </motion.h3>

          {/* Vote Button */}
          <motion.button
            onClick={handleVote}
            disabled={isVoting}
            className="vote-button w-1/2 mx-auto block group/btn relative overflow-hidden py-2"
            whileHover={{ scale: 1.02, opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

            <span className="relative z-10 flex items-center justify-center gap-2">
              {isVoting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <Vote className="w-4 h-4" />
              )}
              <span>{isVoting ? "Voting..." : "Vote"}</span>
            </span>
          </motion.button>
        </div>

        {/* Success Overlay */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="absolute inset-0 bg-green-500/95 backdrop-blur-sm flex items-center justify-center rounded-lg z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center text-white">
                <Check className="w-16 h-16 mx-auto mb-3" />
                <p className="text-xl font-bold mb-1">Vote Counted!</p>
                <p className="text-sm opacity-90">Thank you for voting</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
