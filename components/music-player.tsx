"use client"

import { useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

export function MusicPlayer({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggleAudio = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("[v0] Error de audio:", err))
    }
  }

  return (
    <>
      <audio ref={audioRef} loop src={src} />
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={toggleAudio}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          className={`flex items-center gap-2 rounded-full border px-4 py-3 shadow-2xl backdrop-blur-md transition-all duration-300 ${
            isPlaying
              ? "scale-105 animate-pulse border-amber-300 bg-amber-500/90 text-white"
              : "border-amber-500/40 bg-neutral-900/80 text-amber-400 hover:bg-neutral-800"
          }`}
        >
          {isPlaying ? (
            <>
              <Volume2 className="h-5 w-5 animate-bounce" />
              <span className="text-xs font-semibold uppercase tracking-wider">Música On</span>
            </>
          ) : (
            <>
              <VolumeX className="h-5 w-5 text-red-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">Música Off</span>
            </>
          )}
        </button>
      </div>
    </>
  )
}
