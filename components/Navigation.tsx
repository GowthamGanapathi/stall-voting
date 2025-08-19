"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Store, BarChart3 } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navigation({
  activeTab,
  onTabChange,
}: NavigationProps) {
  const tabs = [
    { id: "stalls", label: "Vote for Stalls", icon: Store },
    { id: "results", label: "Live Results", icon: BarChart3 },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-2 mx-4 mt-4 mb-4">
      <div className="flex justify-center space-x-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`nav-link flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-primary-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={18} />
              <span className="text-sm">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
