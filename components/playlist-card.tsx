'use client'

import Image from 'next/image'
import { Play } from 'lucide-react'
import { Playlist, usePlayerStore } from '@/lib/store'
import { truncateText } from '@/lib/utils'

interface PlaylistCardProps {
  playlist: Playlist
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  const { setQueue } = usePlayerStore()

  const handlePlay = () => {
    setQueue(playlist.tracks, 0)
  }

  return (
    <div className="group bg-spotify-gray hover:bg-gray-700 p-4 rounded-lg transition-all duration-300 cursor-pointer">
      <div className="relative mb-4">
        <div className="relative w-full aspect-square bg-gray-800 rounded-md overflow-hidden shadow-lg">
          <Image
            src={playlist.coverImage}
            alt={playlist.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Play Button Overlay */}
        <button
          onClick={handlePlay}
          className="absolute bottom-2 right-2 bg-spotify-green text-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-105"
        >
          <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
        </button>
      </div>
      
      <h3 className="text-white font-bold text-base mb-1 truncate">
        {playlist.name}
      </h3>
      
      <p className="text-gray-400 text-sm line-clamp-2 leading-tight">
        {truncateText(playlist.description, 80)}
      </p>
    </div>
  )
} 