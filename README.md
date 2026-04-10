# JazzFinder

A modern Next.js web application for discovering, streaming, and enjoying jazz music.

## Features

- 🎵 Jazz music catalog with search functionality
- 🤖 Personalized music recommendations
- ▶️ Real-time audio playback
- 🔐 User authentication
- 💾 Watchlist management

## Tech Stack

- **Frontend**: React 19 + Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

1. Navigate to the project directory:
```bash
cd JazzFinder
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

### Linting

Check code quality:
```bash
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # React components
└── lib/               # Utility functions
```

## Configuration Files

- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `next.config.ts` - Next.js configuration
- `.eslintrc.json` - ESLint configuration

## License

MIT
