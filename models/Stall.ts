import mongoose from "mongoose";

const stallSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  participants: [
    {
      type: String, // Store participant IDs or names
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent duplicate votes from same participant
stallSchema.index({ name: 1, participants: 1 });

export default mongoose.models.Stall || mongoose.model("Stall", stallSchema);
