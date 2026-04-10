import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JazzFinder",
  description: "Discover, stream, and enjoy jazz music",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white">{children}</body>
    </html>
  );
}
