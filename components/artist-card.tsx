'use client'

import Image from 'next/image'
import { Play } from 'lucide-react'
import { Artist, usePlayerStore } from '@/lib/store'

interface ArtistCardProps {
  artist: Artist
}

export function ArtistCard({ artist }: ArtistCardProps) {
  const { setQueue, setIsPlaying } = usePlayerStore()

  const handlePlay = () => {
    if (artist.topTracks.length > 0) {
      setQueue(artist.topTracks, 0)
      setIsPlaying(true)
    }
  }

  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M followers`
    }
    return `${(followers / 1000).toFixed(0)}K followers`
  }

  return (
    <div className="group bg-spotify-gray hover:bg-gray-700 p-4 rounded-lg transition-all duration-300 cursor-pointer">
      <div className="relative mb-4">
        <div className="relative w-full aspect-square bg-gray-800 rounded-full overflow-hidden shadow-lg">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Play Button Overlay */}
        {artist.topTracks.length > 0 && (
          <button
            onClick={handlePlay}
            className="absolute bottom-2 right-2 bg-spotify-green text-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-105"
          >
            <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
          </button>
        )}
      </div>
      
      <h3 className="text-white font-bold text-base mb-1 truncate">
        {artist.name}
      </h3>
      
      <p className="text-gray-400 text-sm mb-1">
        Artist
      </p>
      
      <p className="text-gray-400 text-xs">
        {formatFollowers(artist.followers)}
      </p>
    </div>
  )
} 