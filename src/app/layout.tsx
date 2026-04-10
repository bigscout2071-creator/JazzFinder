import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JazzFinder | The Jazz Club in Your Browser",
  description: "Search, discover, and play your favorite jazz tracks from the iTunes library.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "JazzFinder",
  },
};

export const viewport: Viewport = {
  themeColor: "#090909",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://img.icons8.com/fluency/48/sax.png" />
      </head>
      <body className="antialiased select-none">
        {children}
      </body>
    </html>
  );
}
