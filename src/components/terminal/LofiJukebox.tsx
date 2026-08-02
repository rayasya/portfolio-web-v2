"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, Radio } from "lucide-react";

type Track = {
  id: number;
  title: string;
  artist: string;
  genre: string;
  url: string;
};

const LOFI_TRACKS: Track[] = [
  {
    id: 1,
    title: "Chillhop Coding Session",
    artist: "Lofi Developer Radio",
    genre: "Lo-Fi Beats / Chillhop",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
  },
  {
    id: 2,
    title: "Midnight Syntax & Cyberpunk",
    artist: "Synthwave Beats",
    genre: "Synthwave / Chillwave",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a7b328.mp3?filename=chill-lofi-song-8444.mp3",
  },
  {
    id: 3,
    title: "Late Night Coffee & Debugging",
    artist: "Ambient Code",
    genre: "Ambient / Deep Focus",
    url: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_db6591201e.mp3?filename=lofi-music-110855.mp3",
  },
];


export default function LofiJukebox() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = LOFI_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.url);
    } else {
      audioRef.current.src = currentTrack.url;
    }

    audioRef.current.volume = isMuted ? 0 : volume;

    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % LOFI_TRACKS.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + LOFI_TRACKS.length) % LOFI_TRACKS.length);
  };

  return (
    <div className="rounded-xl border border-purple-500/30 bg-white dark:bg-slate-900 p-4 font-mono text-xs shadow-md dark:shadow-xl space-y-4 max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold">
          <Radio className="h-4 w-4 animate-pulse" />
          <span>Lo-Fi Coding Beats Radio v1.0</span>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
          isPlaying ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30" : "bg-slate-200 dark:bg-slate-800 text-slate-500"
        }`}>
          {isPlaying ? "● LIVE PLAYING" : "PAUSED"}
        </span>
      </div>

      {/* Track Info Card */}
      <div className="bg-slate-100 dark:bg-slate-950 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider">
            Now Playing [{currentTrackIndex + 1}/{LOFI_TRACKS.length}]
          </span>
          {/* Animated Equalizer Wave */}
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-1 bg-emerald-500 animate-[bounce_0.8s_infinite]"></span>
              <span className="w-1 bg-cyan-500 animate-[bounce_1.2s_infinite]"></span>
              <span className="w-1 bg-purple-500 animate-[bounce_0.6s_infinite]"></span>
              <span className="w-1 bg-amber-500 animate-[bounce_1s_infinite]"></span>
            </div>
          )}
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <Music className="h-3.5 w-3.5 text-purple-500" /> {currentTrack.title}
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {currentTrack.artist} • <span className="text-cyan-600 dark:text-cyan-400">{currentTrack.genre}</span>
          </p>
        </div>
      </div>

      {/* Audio Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevTrack}
            className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-purple-500 transition-colors"
            title="Previous Track"
          >
            <SkipBack className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="p-2.5 rounded-full bg-purple-600 text-white hover:bg-purple-500 transition-colors shadow-md"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={nextTrack}
            className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-purple-500 transition-colors"
            title="Next Track"
          >
            <SkipForward className="h-4 w-4" />
          </button>
        </div>

        {/* Volume Slider */}
        <div className="flex items-center gap-2 text-slate-500">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="hover:text-purple-500 transition-colors"
          >
            {isMuted || volume === 0 ? <VolumeX className="h-4 w-4 text-rose-500" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              setIsMuted(false);
            }}
            className="w-20 accent-purple-600 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
