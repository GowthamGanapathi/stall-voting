"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Award, Trash2 } from "lucide-react";

interface VoteCounts {
  [key: string]: number;
}

export default function ResultsPage() {
  const [voteCounts, setVoteCounts] = useState<VoteCounts>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVoteCounts();
    // Refresh every 10 seconds for live updates
    const interval = setInterval(loadVoteCounts, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadVoteCounts = async () => {
    try {
      setError(null);
      const response = await fetch("/api/vote");
      if (response.ok) {
        const data = await response.json();
        setVoteCounts(data);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error loading vote counts:", error);
      setError("Failed to load voting results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetVotes = async () => {
    if (window.confirm("Are you sure you want to reset all votes to 0?")) {
      try {
        console.log("Attempting to reset votes...");
        const response = await fetch("/api/reset-votes", {
          method: "POST",
        });

        console.log("Reset response status:", response.status);

        if (response.ok) {
          const result = await response.json();
          console.log("Reset successful:", result);

          // Force reload of vote counts
          await loadVoteCounts();
          alert("All votes have been reset to 0.");
        } else {
          const errorText = await response.text();
          console.error(
            "Reset failed with status:",
            response.status,
            "Error:",
            errorText
          );
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
        }
      } catch (error) {
        console.error("Error resetting votes:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        alert(`Failed to reset votes: ${errorMessage}`);
      }
    }
  };

  const sortedStalls = Object.entries(voteCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([name, votes], index) => ({ name, votes, rank: index + 1 }));

  const totalVotes = Object.values(voteCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadVoteCounts}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
          <p className="mt-4">
            <a href="/" className="text-blue-600 hover:text-blue-700 underline">
              ← Back to Voting
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Live Voting Results
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Real-time results from your stall voting event! 🎉
          </p>

          {/* Reset Votes Button */}
          <button
            onClick={handleResetVotes}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <Trash2 className="w-4 h-4" />
            Reset All Votes
          </button>
        </div>

        {/* Summary Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {totalVotes}
              </div>
              <div className="text-gray-600">Total Votes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {Object.keys(voteCounts).length}
              </div>
              <div className="text-gray-600">Total Stalls</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">
                {totalVotes > 0
                  ? Math.round(
                      (Math.max(...Object.values(voteCounts)) / totalVotes) *
                        100
                    )
                  : 0}
                %
              </div>
              <div className="text-gray-600">Leading Stall Share</div>
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {sortedStalls.map((stall, index) => (
            <motion.div
              key={stall.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4">
                {/* Rank Icon */}
                <div className="flex-shrink-0">
                  {index === 0 ? (
                    <Trophy className="w-8 h-8 text-yellow-500" />
                  ) : index === 1 ? (
                    <Medal className="w-8 h-8 text-gray-400" />
                  ) : index === 2 ? (
                    <Award className="w-8 h-8 text-amber-600" />
                  ) : (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-600">
                        {stall.rank}
                      </span>
                    </div>
                  )}
                </div>

                {/* Stall Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {stall.name}
                  </h3>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <motion.div
                      className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          totalVotes > 0 ? (stall.votes / totalVotes) * 100 : 0
                        }%`,
                      }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>

                  {/* Vote Count */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {stall.votes} votes
                    </span>
                    <span className="text-sm font-semibold text-blue-600">
                      {totalVotes > 0
                        ? Math.round((stall.votes / totalVotes) * 100)
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>Results update automatically every 10 seconds</p>
          <p className="mt-2">
            <a href="/" className="text-blue-600 hover:text-blue-700 underline">
              ← Back to Voting
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
