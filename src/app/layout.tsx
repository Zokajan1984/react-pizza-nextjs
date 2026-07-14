import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "React Pizza | Самая вкусная пицца",
  description: "Онлайн магазин пиццы на Next.js и Zustand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
      >
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <main className="max-w-7xl mx-auto bg-white min-h-screen px-4 md:px-10 shadow-sm">
          {children}
        </main>
      </body>
    </html>
  );
}
