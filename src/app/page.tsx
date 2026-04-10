'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Music, Disc, Mic, Play, Pause, SkipBack, SkipForward, Volume2, Home, Library, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { searchJazz, type ITunesResult } from '@/lib/itunes';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function JazzFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ITunesResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'song' | 'album' | 'musicArtist'>('song');
  const [currentTrack, setCurrentTrack] = useState<ITunesResult | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        handleSearch(searchTerm, activeFilter);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, activeFilter]);

  const handleSearch = async (term: string, filter: 'song' | 'album' | 'musicArtist') => {
    setLoading(true);
    const data = await searchJazz(term, filter);
    setResults(data);
    setLoading(false);
  };

  const togglePlay = (track?: ITunesResult) => {
    if (track && currentTrack?.trackId !== track.trackId) {
      setCurrentTrack(track);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = track.previewUrl || '';
        audioRef.current.play();
      }
    } else {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  return (
    <div className="flex h-screen bg-[#090909] text-gray-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-black flex flex-col p-6 space-y-8 border-r border-gray-800/50 hidden md:flex">
        <div className="flex items-center space-x-2 text-amber-500">
          <Music size={32} />
          <h1 className="text-2xl font-bold tracking-tight">JazzFinder</h1>
        </div>

        <nav className="space-y-4">
          <NavItem icon={<Home size={20} />} label="Home" active />
          <NavItem icon={<Search size={20} />} label="Search" />
          <NavItem icon={<Library size={20} />} label="Your Library" />
        </nav>

        <div className="pt-8 space-y-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Playlists</p>
          <NavItem icon={<Heart size={20} className="text-amber-500" />} label="Liked Songs" />
          <div className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors px-2">Midnight Saxophone</div>
          <div className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors px-2">Cool Jazz Classics</div>
          <div className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors px-2">Bebop Essentials</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header/Search Area */}
        <header className="p-6 bg-gradient-to-b from-gray-900 to-transparent flex flex-col space-y-6">
          <div className="flex items-center space-x-4 max-w-2xl w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search for Jazz tracks, albums, or artists..."
                className="w-full bg-gray-800/50 border border-gray-700 rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <FilterBtn label="Songs" active={activeFilter === 'song'} onClick={() => setActiveFilter('song')} />
            <FilterBtn label="Albums" active={activeFilter === 'album'} onClick={() => setActiveFilter('album')} />
            <FilterBtn label="Artists" active={activeFilter === 'musicArtist'} onClick={() => setActiveFilter('musicArtist')} />
          </div>
        </header>

        {/* Results Area */}
        <section className="flex-1 overflow-y-auto p-6 pb-32 scrollbar-hide">
          {!searchTerm && !results.length && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-50 space-y-4">
              <Disc size={64} className="animate-spin-slow" />
              <p className="text-xl font-medium">Ready for some Jazz?</p>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-800/50 rounded-xl aspect-square" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              <AnimatePresence mode="popLayout">
                {results.map((item) => (
                  <motion.div
                    key={item.trackId || item.collectionId || item.artistId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TrackCard 
                      item={item} 
                      onPlay={() => togglePlay(item)} 
                      isPlaying={currentTrack?.trackId === item.trackId && isPlaying}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>

      {/* Persistent Player */}
      {currentTrack && (
        <footer className="fixed bottom-0 left-0 right-0 h-24 bg-black/95 backdrop-blur-md border-t border-gray-800 px-6 flex items-center justify-between z-50">
          {/* Track Info */}
          <div className="flex items-center space-x-4 w-1/3">
            <img 
              src={currentTrack.artworkUrl100} 
              alt={currentTrack.trackName} 
              className="w-14 h-14 rounded-md shadow-lg"
            />
            <div className="min-w-0">
              <h4 className="font-semibold truncate text-sm">{currentTrack.trackName || currentTrack.collectionName}</h4>
              <p className="text-xs text-gray-400 truncate">{currentTrack.artistName}</p>
            </div>
            <Heart size={18} className="text-gray-400 hover:text-amber-500 cursor-pointer flex-shrink-0" />
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center w-1/3 space-y-2">
            <div className="flex items-center space-x-6 text-gray-400">
              <SkipBack size={20} className="hover:text-white cursor-pointer" />
              <button 
                onClick={() => togglePlay()}
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
              </button>
              <SkipForward size={20} className="hover:text-white cursor-pointer" />
            </div>
            <div className="w-full max-w-md flex items-center space-x-2 text-[10px] text-gray-500">
              <span>0:00</span>
              <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden cursor-pointer group">
                <div 
                  className="h-full bg-amber-500 transition-all group-hover:bg-amber-400" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
              <span>0:30</span>
            </div>
          </div>

          {/* Volume */}
          <div className="flex items-center justify-end space-x-3 w-1/3 text-gray-400">
            <Volume2 size={20} />
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 h-1 bg-gray-800 rounded-full accent-amber-500 cursor-pointer"
            />
          </div>
        </footer>
      )}

      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={cn(
      "flex items-center space-x-3 px-2 py-2 rounded-md transition-colors cursor-pointer",
      active ? "text-white bg-white/10" : "text-gray-400 hover:text-white"
    )}>
      {icon}
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}

function FilterBtn({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
        active ? "bg-amber-500 text-black" : "bg-gray-800/50 text-white hover:bg-gray-700"
      )}
    >
      {label}
    </button>
  );
}

function TrackCard({ item, onPlay, isPlaying }: { item: ITunesResult, onPlay: () => void, isPlaying: boolean }) {
  return (
    <div className="group bg-gray-900/40 p-4 rounded-xl hover:bg-gray-800/60 transition-all cursor-pointer relative shadow-xl border border-gray-800/50">
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
        <img 
          src={item.artworkUrl100.replace('100x100', '400x400')} 
          alt={item.trackName || item.collectionName} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className={cn(
          "absolute bottom-2 right-2 p-3 bg-amber-500 text-black rounded-full shadow-2xl transition-all duration-300",
          isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-75 translate-y-4 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0"
        )}>
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
        </div>
      </div>
      <h3 className="font-bold text-sm truncate mb-1">{item.trackName || item.collectionName}</h3>
      <p className="text-xs text-gray-500 truncate">{item.artistName}</p>
      
      {/* Invisible overlay to handle click for the whole card */}
      <div className="absolute inset-0 z-10" onClick={onPlay} />
    </div>
  );
}
