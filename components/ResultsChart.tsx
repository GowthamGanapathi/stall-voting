"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";

interface Stall {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  votes: number;
}

interface ResultsChartProps {
  stalls: Stall[];
}

export default function ResultsChart({ stalls }: ResultsChartProps) {
  const sortedStalls = [...stalls].sort((a, b) => b.votes - a.votes);
  const maxVotes = Math.max(...stalls.map((s) => s.votes));

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
        );
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return "from-yellow-400 to-yellow-600";
      case 1:
        return "from-gray-300 to-gray-500";
      case 2:
        return "from-amber-500 to-amber-700";
      default:
        return "from-primary-400 to-primary-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800 mb-2"
        >
          Live Voting Results
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600"
        >
          See which stalls are leading the race! 🏆
        </motion.p>
      </div>

      {/* Results Grid */}
      <div className="grid gap-6">
        {sortedStalls.map((stall, index) => (
          <motion.div
            key={stall._id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4">
              {/* Rank Icon */}
              <div className="flex-shrink-0">{getRankIcon(index)}</div>

              {/* Stall Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-800 truncate">
                    {stall.name}
                  </h3>
                  <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                    {stall.category}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <motion.div
                    className={`h-3 rounded-full bg-gradient-to-r ${getRankColor(
                      index
                    )}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(stall.votes / maxVotes) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>

                {/* Vote Count */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {stall.votes} votes
                  </span>
                  <span className="text-sm font-semibold text-primary-600">
                    {maxVotes > 0
                      ? Math.round((stall.votes / maxVotes) * 100)
                      : 0}
                    %
                  </span>
                </div>
              </div>

              {/* Stall Image */}
              <div className="flex-shrink-0">
                <img
                  src={stall.imageUrl}
                  alt={stall.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Total Votes Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white text-center"
      >
        <div className="flex items-center justify-center space-x-2 mb-2">
          <TrendingUp className="w-6 h-6" />
          <h3 className="text-xl font-bold">Total Participation</h3>
        </div>
        <p className="text-2xl font-bold">
          {stalls.reduce((sum, stall) => sum + stall.votes, 0)} Total Votes
        </p>
        <p className="text-primary-100 text-sm">
          Across {stalls.length} amazing stalls
        </p>
      </motion.div>
    </div>
  );
}
