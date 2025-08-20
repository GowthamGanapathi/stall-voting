import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "THE GREAT ESCAPE - Stall Voting Event",
  description: "Vote for your favorite stall in our fun office event!",
  icons: {
    icon: "/images/the-great-escape-logo.png",
    shortcut: "/images/the-great-escape-logo.png",
    apple: "/images/the-great-escape-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
