# 🎷 JazzFinder

JazzFinder is a beautiful, Spotify-style web application for searching and playing jazz music using the iTunes Search API.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbigscout2071-creator%2FJazzFinder)

## ✨ Features

- **Real-time Jazz Search**: Search for tracks, albums, and artists.
- **Midnight Jazz Club UI**: Elegant dark-themed design with amber accents.
- **Audio Previews**: 30-second high-quality audio previews.
- **PWA Support**: Install it on your mobile device or desktop as a standalone app.
- **Responsive Design**: Optimized for both mobile and desktop screens.

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **API**: iTunes Search API (Proxy through Next.js API Routes)

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/bigscout2071-creator/JazzFinder.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Security

- **Server-Side API Route**: iTunes API calls are proxied through `/api/search` to protect client communication.
- **Secure Headers**: Configured with strict security headers (X-Frame-Options, etc.).
- **Optimized Image Patterns**: Only trusted iTunes image domains are allowed.

## 📱 Installation (PWA)

To install this as an app:
- **iOS (Safari)**: Tap the Share button and select "Add to Home Screen".
- **Android/Chrome**: Tap the 3 dots (menu) or the install icon in the address bar and select "Install App".
