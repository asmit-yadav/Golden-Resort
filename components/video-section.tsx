"use client"

import { useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <section className="py-16 sm:py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-rose-900/40 text-rose-400 font-medium text-sm mb-6">
            Our Work
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Experience the Magic
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            See how we bring visions to life. A glimpse into the unforgettable events we create.
          </p>

          {/* Video Container */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-rose-500/10 group">
            <video
              ref={videoRef}
              src="/Event_Video.MOV"
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              className="w-full aspect-video object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Play overlay (shown when paused) */}
            {!isPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-opacity"
                onClick={togglePlay}
              >
                <div className="w-20 h-20 rounded-full bg-rose-600/90 flex items-center justify-center hover:bg-rose-600 transition-colors hover:scale-110 transform duration-300">
                  <Play size={36} className="text-white ml-1" />
                </div>
              </div>
            )}

            {/* Controls bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between">
              <button
                onClick={togglePlay}
                className="text-white hover:text-rose-400 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button
                onClick={toggleMute}
                className="text-white hover:text-rose-400 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
