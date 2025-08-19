# 🎉 Stall Voting Event App

A fun and interactive single-page application for office stall voting events built with Next.js and MongoDB.

## ✨ Features

- **Beautiful UI**: Modern, responsive design with smooth animations
- **Real-time Voting**: Live vote counting with automatic updates
- **Single Vote Policy**: Participants can only vote for one stall
- **Live Results**: Real-time results display with rankings and progress bars
- **15 Sample Stalls**: Pre-loaded with diverse stall categories
- **Mobile Responsive**: Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone and install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory:

   ```env
   MONGODB_URI=mongodb://localhost:27017/stall-voting
   ```

   For MongoDB Atlas:

   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stall-voting?retryWrites=true&w=majority
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Seed the database:**
   Click the "Load Sample Stalls" button to populate the database with 15 sample stalls.

## 🏗️ Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   │   ├── stalls/        # Stall CRUD operations
│   │   └── stalls/vote/   # Voting endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page component
├── components/             # React components
│   ├── Navigation.tsx     # Tab navigation
│   ├── StallCard.tsx      # Individual stall display
│   └── ResultsChart.tsx   # Results visualization
├── lib/                    # Utility functions
│   └── mongodb.ts         # Database connection
├── models/                 # MongoDB models
│   └── Stall.ts           # Stall schema
└── package.json            # Dependencies and scripts
```

## 🎯 How It Works

### Voting System

- Participants can view all 15 stalls with descriptions and images
- Each participant can vote for only **one** stall
- Votes are tracked by unique participant IDs
- Real-time vote counting with automatic updates

### Navigation

- **Stalls Tab**: Browse and vote for stalls
- **Results Tab**: View live voting results with rankings

### Database Schema

```typescript
interface Stall {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  votes: number;
  participants: string[]; // Prevents duplicate voting
}
```

## 🎨 UI Components

- **Stall Cards**: Beautiful cards with hover effects and voting buttons
- **Progress Bars**: Animated progress bars showing vote percentages
- **Rankings**: Trophy icons for top 3 stalls
- **Animations**: Smooth transitions and micro-interactions
- **Responsive Grid**: Adapts to different screen sizes

## 🔧 Customization

### Adding New Stalls

1. Modify the `sampleStalls` array in `app/api/stalls/seed/route.ts`
2. Add your stall information with:
   - Name
   - Description
   - Image URL
   - Category

### Styling

- Uses Tailwind CSS for styling
- Custom color scheme in `tailwind.config.js`
- Component-specific styles in `app/globals.css`

### Categories

Current categories include:

- Technology
- Food & Beverage
- Arts & Crafts
- Health & Wellness
- Entertainment
- Environment
- Sports & Fitness
- Education
- Business

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

- Ensure MongoDB connection string is properly configured
- Set `NODE_ENV=production`
- Build with `npm run build`

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**

   - Check your connection string in `.env.local`
   - Ensure MongoDB is running
   - Verify network access for Atlas

2. **Stalls Not Loading**

   - Click "Load Sample Stalls" button
   - Check browser console for errors
   - Verify API routes are working

3. **Voting Not Working**
   - Check participant ID generation
   - Verify MongoDB connection
   - Check API endpoint responses

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy Voting! 🎊**
